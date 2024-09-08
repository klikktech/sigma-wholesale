'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import { Input, Button, Textarea, Spacer } from '@nextui-org/react';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    phoneNumber: string;
    altPhoneNumber: string;
    taxNumber: string;
    website: string;
    password: string;
    confirmPassword: string;
    bio: string;
    address1: string;
    address2: string;
    city: string;
    country: string;
    zipCode: string;
}

const Register = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        phoneNumber: '',
        altPhoneNumber: '',
        taxNumber: '',
        website: '',
        password: '',
        confirmPassword: '',
        bio: '',
        address1: '',
        address2: '',
        city: '',
        country: '',
        zipCode: '',
    });

    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            confirmPassword,
            address1,
            city,
            country,
            zipCode,
        } = formData;

        if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword || !address1 || !city || !country || !zipCode) {
            setError('Please fill in all required fields.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Mock successful submission
        setSuccess('Your sign-up was successful!');
        setError('');
        // Here you would send formData to your backend
    };

    return (
        <div className="flex justify-center p-5">
            <form onSubmit={handleSubmit} className="flex flex-col w-full" style={{ maxWidth: '600px'}}>
                <div className="flex gap-3">
                    <Input
                        label="First Name *"
                        name="firstName"
                        placeholder="John"
                        labelPlacement='outside'
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <Input
                        label="Last Name *"
                        name="lastName"
                        placeholder="Doe"
                        labelPlacement='outside'
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                </div>

                <Spacer y={3} />
                <Input
                    label="Email *"
                    name="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    labelPlacement='outside'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <Spacer y={3} />
                <Input
                    label="Company Name"
                    name="companyName"
                    placeholder="Company LLC"
                    labelPlacement='outside'
                    value={formData.companyName}
                    onChange={handleChange}
                    fullWidth
                />

                <Spacer y={3} />
                <div className="flex gap-3">
                    <Input
                        label="Phone Number *"
                        name="phoneNumber"
                        type="tel"
                        placeholder="123-456-7890"
                        labelPlacement='outside'
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <Input
                        label="Alternative Phone Number"
                        name="altPhoneNumber"
                        type="tel"
                        placeholder="Optional"
                        labelPlacement='outside'
                        value={formData.altPhoneNumber}
                        onChange={handleChange}
                        fullWidth
                    />
                </div>

                <Spacer y={3} />
                <Input
                    label="Sales Tax Number"
                    name="taxNumber"
                    placeholder="123456789"
                    labelPlacement='outside'
                    value={formData.taxNumber}
                    onChange={handleChange}
                    fullWidth
                />

                <Spacer y={3} />
                <Input
                    label="Website"
                    name="website"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    labelPlacement='outside'
                    value={formData.website}
                    onChange={handleChange}
                    fullWidth
                />

                <Spacer y={3} />
                <div className="flex gap-3">
                    <Input
                        label="Password *"
                        name="password"
                        type="password"
                        placeholder="********"
                        labelPlacement='outside'
                        value={formData.password}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <Input
                        label="Confirm Password *"
                        name="confirmPassword"
                        type="password"
                        placeholder="********"
                        labelPlacement='outside'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                </div>

                <Spacer y={3} />
                <Textarea
                    label="Tell us a little about yourself"
                    name="bio"
                    placeholder="This will help us verify your business identity"
                    labelPlacement='outside'
                    value={formData.bio}
                    onChange={handleChange}
                    fullWidth
                />

                <Spacer y={3} />
                <Input
                    label="Address 1 *"
                    name="address1"
                    placeholder="123 Main St"
                    labelPlacement='outside'
                    value={formData.address1}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <Spacer y={3} />
                <Input
                    label="Address 2"
                    name="address2"
                    placeholder="Apartment, suite, etc."
                    labelPlacement='outside'
                    value={formData.address2}
                    onChange={handleChange}
                    fullWidth
                />

                <Spacer y={3} />
                <div className="flex gap-3">
                    <Input
                        label="City *"
                        name="city"
                        placeholder="City"
                        labelPlacement='outside'
                        value={formData.city}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <Input
                        label="Country *"
                        name="country"
                        placeholder="Country"
                        labelPlacement='outside'
                        value={formData.country}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <Input
                        label="Zip Code *"
                        name="zipCode"
                        placeholder="ZIP"
                        labelPlacement='outside'
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                </div>

                <Spacer y={3} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <Button type="submit" color="primary" size="lg">
                    Register                
                </Button>
            </form>
        </div>
    );
};

export default Register;
