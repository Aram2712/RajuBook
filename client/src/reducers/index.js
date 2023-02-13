import { combineReducers } from "redux";
import login from './login';
import registerStatus from './register';
import user from './user';
import owner from './ownerInfo';
import accounts from './accounts';
import resetPassword from './resetPassword';
import depositSentToAdmin from './sendDepositToAdmin'

export const reducers = combineReducers({ login, registerStatus, user, owner, accounts, resetPassword, depositSentToAdmin })