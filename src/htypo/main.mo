import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Debug "mo:base/Debug";

actor Htypo {
  // essay interface
  public type Writing = {
    title: Text;
    content: Text;
    published: Text;
  };
  stable var writings: List.List<Writing> = List.nil<Writing>();

  public func createWriting(titleText: Text, contentText: Text, publishedText: Text) {
    let newWriting: Writing = {
      title = titleText;
      content = contentText;
      published = publishedText;
    };
    writings := List.push(newWriting, writings);
    Debug.print(debug_show (writings));
  };

  public query func readWritings(): async [Writing] {
    return List.toArray(writings);
  };

  public func removeWriting(id: Nat) {
    let frontWritings = List.take(writings, id);
    let backWritings = List.drop(writings, id + 1);
    writings := List.append(frontWritings, backWritings);
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
      let result = await transfer(msg.caller, amount);
      return result;
    } else {
      return "Already Claimed";
    }
  };

  public shared(msg) func transfer(to : Principal, amount : Nat) : async Text {
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

  // NFT interface
  // public shared(msg) func mint(imageData: [Nat8], name: Text) : async Principal {
  //   let owner : Principal = msg.caller;

  //   Debug.print(debug_show (Cycles.balance()));
  //   Cycles.add(2_500_000_000_000);
  //   let newNFT = await NFTActorClass.NFT(name, owner, imageData);
  //   Debug.print(debug_show (Cycles.balance()));

  //       let newNFTPrincipal = await newNFT.getCanisterId();
  //       return newNFTPrincipal;
  //   };
}