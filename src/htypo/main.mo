import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Debug "mo:base/Debug";
import IcpLedger "canister:icp_ledger_canister";
import Result "mo:base/Result";
import Error "mo:base/Error";

actor {

  public query (message) func whoami() : async Principal {
      message.caller;
  };
  var registeredUsers: List.List<Principal> = List.nil<Principal>();

  public func register(id: Principal) : async Text {
    Debug.print(debug_show (id));
    if (List.find(registeredUsers, func (x: Principal) : Bool {x == id}) != null) {
      return "Already registered";
    } else {
      registeredUsers := List.push(id, registeredUsers);
      return "Registered successfully";
    }
  };

  public type Profile = {
    transferredICP: Nat;
    wordsPlayed: Nat;
    correctWords: Nat;
    lettersPlayed: Nat;
    secondsPlayed: Nat;
    highestScore : Nat;
  };
  var userProfiles: HashMap.HashMap<Principal, Profile> = HashMap.HashMap<Principal, Profile>(1, Principal.equal, Principal.hash);

  public func getProfile(id: Principal) : async Profile {
    let profile: Profile = switch (userProfiles.get(id)) {
      case null {
        let newProfile: Profile = {
          transferredICP = 0;
          wordsPlayed = 0;
          correctWords = 0;
          lettersPlayed = 0;
          secondsPlayed = 0;
          highestScore = 0;
        };
        userProfiles.put(id, newProfile);
        return newProfile;
      };
      case (?result) result;
    };
    return profile;
  };

  public func updateProfile(id: Principal, profile: Profile): async Text {
    userProfiles.put(id, profile);
    return "Profile updated";
  };

  public query func readProfiles() : async [(Principal, Profile)] {
    return Iter.toArray(userProfiles.entries());
  };

  // essay interface
  public type Note = {
    title: Text;
    content: Text;
    published: Text;
  };
  stable var notes: List.List<Note> = List.nil<Note>();

  public func createNote(titleText: Text, contentText: Text, publishedText: Text) {
    let newNote: Note = {
      title = titleText;
      content = contentText;
      published = publishedText;
    };
    notes := List.push(newNote, notes);
    Debug.print(debug_show (notes));
  };

  public query func readNotes(): async [Note] {
    return List.toArray(notes);
  };

  public func removeNote(id: Nat) {
    let frontNotes = List.take(notes, id);
    let backNotes = List.drop(notes, id + 1);
    notes := List.append(frontNotes, backNotes);
  };

  // token interface
  let owner : Principal = Principal.fromText("pxw5b-qjap2-nvhec-h6unt-kpsji-mwyed-4y5qb-mhzec-begqp-tziqs-uqe");
  let totalSupply : Nat = 1000000000;
  let symbol : Text = "MIKI";

  // create ledger
  private stable var balanceEntries : [(Principal, Nat)] = [];
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  if (balances.size() < 1) {
    balances.put(owner, totalSupply);
  };

  public query func balanceOf(who: Principal) : async Nat {
    let balance : Nat = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };
    return balance;
  };

  public query func getSymbol() : async Text {
    return symbol;
  };

  public shared(msg) func payOut() : async Text {
    // msg.caller: canister ID
    if (balances.get(msg.caller) == null) {
      let amount = 10000;
      let result = await transferMiki(msg.caller, amount);
      return result;
    } else {
      return "Already Claimed";
    }
  };

  public shared(msg) func transferMiki(to : Principal, amount : Nat) : async Text {
    // msg.caller: anonymous user
    let fromBalance = await balanceOf(msg.caller);
    if (fromBalance > amount) {
      let newFromBalance : Nat = fromBalance - amount;
      balances.put(msg.caller, newFromBalance);

      let toBalance = await balanceOf(to);
      let newToBalance = toBalance + amount;
      balances.put(to, newToBalance);

      return "Success";
    } else {
      return "Insufficient funds";
    }
  };

  system func preupgrade() {
    balanceEntries := Iter.toArray(balances.entries());
  };

  system func postupgrade() {
    balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    if (balances.size() < 1) {
      balances.put(owner, totalSupply);
    }
  };

  // ICP Ledger interface
  type Tokens = {
    e8s : Nat64;
  };

  type TransferArgs = {
    amount : Tokens;
    toPrincipal : Principal;
    toSubaccount : ?IcpLedger.SubAccount;
  };

  public shared func transfer(args : TransferArgs) : async Result.Result<IcpLedger.BlockIndex, Text> {
    Debug.print(
      "Transferring "
      # debug_show (args.amount)
      # " tokens to principal "
      # debug_show (args.toPrincipal)
      # " subaccount "
      # debug_show (args.toSubaccount)
    );

    let transferArgs : IcpLedger.TransferArgs = {
      // can be used to distinguish between transactions
      memo = 0;
      // the amount we want to transfer
      amount = args.amount;
      // the ICP ledger charges 10_000 e8s for a transfer
      fee = { e8s = 10_000 };
      // we are transferring from the canisters default subaccount, therefore we don't need to specify it
      from_subaccount = null;
      // we take the principal and subaccount from the arguments and convert them into an account identifier
      to = Principal.toLedgerAccount(args.toPrincipal, args.toSubaccount);
      // a timestamp indicating when the transaction was created by the caller; if it is not specified by the caller then this is set to the current ICP time
      created_at_time = null;
    };

    try {
      // initiate the transfer
      let transferResult = await IcpLedger.transfer(transferArgs);

      // check if the transfer was successfull
      switch (transferResult) {
        case (#Err(transferError)) {
          return #err("Couldn't transfer funds:\n" # debug_show (transferError));
        };
        case (#Ok(blockIndex)) { return #ok blockIndex };
      };
    } catch (error : Error) {
      // catch any errors that might occur during the transfer
      return #err("Reject message: " # Error.message(error));
    };
  };
}