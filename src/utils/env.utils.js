import argsUtils from "./args.utils.js"

const {mode} = argsUtils
export const envpath = mode === "dev" ? ".env" : `.env.${mode}`
