'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button, Input, Spacer } from '@nextui-org/react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/signin', {
                username,
                password,
            });

            const { accessToken, refreshToken } = response.data;

            // Store tokens in local storage (or secure storage if preferred)
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // Redirect to protected route or home page
            router.push('/home');
        } catch (error: any) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="flex justify-center p-5">
            <form onSubmit={handleSubmit} className="flex flex-col w-full" style={{ maxWidth: '600px' }}>
                <Input
                    label="Email *"
                    name="email"
                    placeholder="johndoe@example.com"
                    labelPlacement='outside'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    fullWidth
                />
                <Spacer y={3} />
                <Input
                    label="Password *"
                    name="password"
                    type="password"
                    placeholder="********"
                    labelPlacement='outside'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                />
                <Spacer y={3} />
                <Button type="submit" color="primary" size="lg">
                    Register
                </Button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;