export async function setCartByRole(role, uid_req, uid_online, res, executeFunction) {
    const {owner_id} = await executeFunction(uid_req)
    let userReq
    if (role == "ADMIN") userReq = await executeFunction(uid_req)
    if (role == "USER") {
        const uidOnline = uid_online.toString()
        if (uidOnline == owner_id) {
            userReq = await executeFunction(uid_req)
        } else return res.json403("you are not a admin")
    }
    return userReq
}