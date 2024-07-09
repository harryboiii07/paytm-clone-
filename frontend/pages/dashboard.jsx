import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export function Dashboard(){
  return <>
    <Appbar></Appbar>
    <Balance></Balance>
    <Users></Users>
  </>
}