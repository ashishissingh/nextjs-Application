// lib/resendOtp.ts
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

type ResendOtpProps = {
  email: string;
  userPoolId: string;
  clientId: string;
};

export async function resendOtp({ email, userPoolId, clientId }: ResendOtpProps) {
  const poolData = { UserPoolId: userPoolId, ClientId: clientId };
  const userPool = new CognitoUserPool(poolData);
  const userData = { Username: email, Pool: userPool };
  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
