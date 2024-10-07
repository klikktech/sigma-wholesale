package com.klikk.sigma.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.MessageDigest;

public class PhpPassPasswordEncoder implements PasswordEncoder {

    private static final String itoa64 = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private static final int ITERATION_COUNT = 15;  // Number of hash iterations (2^15)
    private static final int SALT_LENGTH = 8;      // Length of the salt
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public String encode(CharSequence rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        if (encodedPassword == null) {
            throw new IllegalArgumentException("Invalid hash format");
        }
        if (!encodedPassword.startsWith("$P$")) {
            return passwordEncoder.matches(rawPassword.toString(), encodedPassword);
        }
        return hashPassword(rawPassword.toString(), encodedPassword).equals(encodedPassword);
    }

    private String hashPassword(String password, String storedHash) {
        String salt = storedHash.substring(4, 12);  // Extract the salt from the hash
        int countLog2 = itoa64.indexOf(storedHash.charAt(3));  // Extract the iteration count
        int count = 1 << countLog2;  // Calculate the number of iterations

        MessageDigest md;
        try {
            md = MessageDigest.getInstance("MD5");  // PHPass uses MD5 hashing
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        // Initial hash of the password with the salt
        byte[] hash = md.digest((salt + password).getBytes());

        // Rehash the result multiple times as per PHPass logic
        for (int i = 0; i < count; i++) {
            hash = md.digest(concat(hash, password.getBytes()));
        }

        // Return the final hash in PHPass format: $P$[iteration][salt][hash]
        return storedHash.substring(0, 12) + encode64(hash, 16);
    }

    private byte[] concat(byte[] array1, byte[] array2) {
        byte[] result = new byte[array1.length + array2.length];
        System.arraycopy(array1, 0, result, 0, array1.length);
        System.arraycopy(array2, 0, result, array1.length, array2.length);
        return result;
    }

    private String encode64(byte[] input, int count) {
        StringBuilder output = new StringBuilder();
        int i = 0;
        do {
            int value = input[i++] & 0xFF;
            output.append(itoa64.charAt(value & 0x3f));
            if (i < count) value |= (input[i] & 0xFF) << 8;
            output.append(itoa64.charAt((value >> 6) & 0x3f));
            if (i++ >= count) break;
            if (i < count) value |= (input[i] & 0xFF) << 16;
            output.append(itoa64.charAt((value >> 12) & 0x3f));
            if (i++ >= count) break;
            output.append(itoa64.charAt((value >> 18) & 0x3f));
        } while (i < count);
        return output.toString();
    }
}
