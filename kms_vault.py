import os
import boto3
from botocore.exceptions import ClientError

class EnterpriseKMSManager:
    def __init__(self):
        self.kms_client = boto3.client('kms', region_name=os.getenv("AWS_REGION", "eu-central-1"))
        self.key_id = os.getenv("AWS_KMS_KEY_ARN", "alias/enterprise-data-key")

    def encrypt_data(self, plain_text: str) -> bytes:
        """Encrypts sensitive payload fields using AWS KMS Hardware Security Modules (HSM)"""
        try:
            response = self.kms_client.encrypt(
                KeyId=self.key_id,
                Plaintext=plain_text.encode('utf-8')
            )
            return response['CiphertextBlob']
        except ClientError as e:
            raise RuntimeError(f"KMS Encryption failed: {e}")

    def decrypt_data(self, cipher_blob: bytes) -> str:
        """Decrypts enterprise ciphertexts securely"""
        try:
            response = self.kms_client.decrypt(
                CiphertextBlob=cipher_blob
            )
            return response['Plaintext'].decode('utf-8')
        except ClientError as e:
            raise RuntimeError(f"KMS Decryption failed: {e}")
