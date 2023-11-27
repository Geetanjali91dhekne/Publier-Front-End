import { Card } from 'antd';
import React, { useMemo, useState } from 'react';
import PNormalInput from '../common/NormalInput';
import { MdEmail } from 'react-icons/md';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import PButton from '../common/Button';
import logo from '../../assets/icons/publir.svg';
import { User, UserState } from './redux/types';
import Apis from '../../api';
import { useDispatch } from 'react-redux';
import LoginActions from './redux/actions';
import MessageActions from '../message/redux/actions';

export type LoginResponse = {
    jwt_token?: {
        token: string;
    };
    user?: User;
};

const Login: React.FC = () => {
    const dispatch = useDispatch();

    const [form, setForm] = useState<{
        email?: string;
        password?: string;
    }>({
        email: undefined,
        password: undefined,
    });

    const [isHidePassword, setHidePassword] = useState(true);
    const [loader, setLoader] = useState(false);

    const onChangeField = (data: { name: string; value?: number | string }) => {
        const { name, value } = data;
        setForm({ ...form, [name]: value });
    };

    const isValidate = useMemo(() => {
        if (!form.email || form.email === '' || !form.password || form.password === '') {
            return false;
        }
        return true;
    }, [form]);

    const onClickSubmit = () => {
        setLoader(true);
        Apis.login(form)
            .then(({ data }) => {
                const response: LoginResponse = data;
                const { jwt_token, user } = response;
                const userData: UserState = {
                    jwtToken: jwt_token?.token,
                    user,
                };
                dispatch(LoginActions.loginReq(userData));
            })
            .catch((err) => {
                setLoader(false);
                dispatch(MessageActions.showMessage({ error: true, text: String(err) }));
            });
    };

    return (
        <div className="w-full h-screen bg-gray-100">
            <div className="flex justify-center items-center h-full flex-col">
                <img src={logo} alt="publirLogo" className="pb-5 w-36" />
                <Card className="w-2/5 px-4 py-2">
                    <div className="flex justify-center items-center pb-6">
                        <p className="font-bold montserrat-medium text-2xl">Login</p>
                    </div>
                    <div className="py-1">
                        <PNormalInput
                            title="Username or Email"
                            name="email"
                            value={form.email}
                            onChange={onChangeField}
                            isRequired
                            suffix={<MdEmail size={'1.3rem'} color="#056433" />}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter' && isValidate && !loader) {
                                    event.preventDefault();
                                    onClickSubmit();
                                }
                            }}
                        />
                    </div>
                    <div className="py-1">
                        <PNormalInput
                            title="Password"
                            type={isHidePassword ? 'password' : 'text'}
                            name="password"
                            value={form.password}
                            onChange={onChangeField}
                            isRequired
                            onKeyPress={(event) => {
                                if (event.key === 'Enter' && isValidate && !loader) {
                                    event.preventDefault();
                                    onClickSubmit();
                                }
                            }}
                            suffix={
                                isHidePassword ? <AiFillEyeInvisible size={'1.3rem'} color="#056433" onClick={() => setHidePassword(!isHidePassword)} /> : <AiFillEye size={'1.3rem'} color="#056433" onClick={() => setHidePassword(!isHidePassword)} />
                            }
                        />
                    </div>
                    <div className="flex justify-center items-center pt-6">
                        <PButton title="Login" disabled={!isValidate} onClick={onClickSubmit} loading={loader} />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;
