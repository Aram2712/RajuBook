import axios from 'axios';
import * as constants from '../constants';
const axiosMainUrl = axios.create({
  baseURL:constants.baseURL,
});

export const fetchRegisterApi = (registerUser) => axiosMainUrl.post('/register', { registerUser });
export const fetchLoginApi = (user) => axiosMainUrl.post('/login', { user });
export const sendFile = (formData) => axiosMainUrl.post('/deposit_request_image', formData);
export const getOwnerInfo = () => axiosMainUrl.get('/owner_parameters');
export const createAccount = (account) => axiosMainUrl.post('/create_account_for_users', account);
export const getAllAccounts = (userId) => axiosMainUrl.post('/get_all_bank_accounts', userId);
export const deleteAccount = (id) => axiosMainUrl.post('/delete_bank_account', id);
export const sendPasswordToEmail = (email) => axiosMainUrl.post('/sendPasswordToEmail', email);
export const sendDepositToAdmin = (formToAdmin) => axiosMainUrl.post('/deposit_request', formToAdmin);
