import MyAddressList from "@/components/organisms/MyAddresses";
import { axios } from "@/lib/axios";

const fetchAddresses = async (type: string) => {
    const { data, error } = await axios.users.getAddresses(type);
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

const MyAddressPage = async () => {
    const storeAddresses = await fetchAddresses('store');
    const shippingAddresses = await fetchAddresses('shipping');
    console.log(storeAddresses, shippingAddresses);
    return (
        <div>
            {/* <MyAddressList storeAddresses={storeAddresses} shippingAddresses={shippingAddresses}/> */}
        </div>
    );
};

export default MyAddressPage;
