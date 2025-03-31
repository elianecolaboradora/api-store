
export async function setUserByRole(role, uid_req, uid_online, res, executeFunction) {
    let userReq
    if (role == "ADMIN") userReq = await executeFunction(uid_req)
    if (role == "USER") {
        const uidOnline = uid_online.toString()
        if (uidOnline == uid_req) {
            userReq = await executeFunction(uid_req)
        } else return res.json403("you are not a admin")
    }
    return userReq
}