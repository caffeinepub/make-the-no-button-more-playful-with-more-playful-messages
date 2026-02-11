import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Response = string;
export type Name = string;
export interface backendInterface {
    checkResponse(): Promise<boolean>;
    submitResponse(name: Name, response: Response): Promise<void>;
}
