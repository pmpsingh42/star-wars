import watchUser from "./modules/user/user.saga";

export default function* Sagas(){
	yield *[watchUser()];
}