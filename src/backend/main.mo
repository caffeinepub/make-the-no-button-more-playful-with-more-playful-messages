import Text "mo:core/Text";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  type Name = Text;
  type Response = Text;

  module Response {
    public func compare(response1 : Response, response2 : Response) : Order.Order {
      Text.compare(response1, response2);
    };
  };

  let responses = Map.empty<Principal, Response>();

  public shared ({ caller }) func submitResponse(name : Name, response : Response) : async () {
    if (responses.containsKey(caller)) { Runtime.trap("Response already submitted") };
    responses.add(caller, response);
  };

  public query ({ caller }) func checkResponse() : async Bool {
    responses.containsKey(caller);
  };
};
