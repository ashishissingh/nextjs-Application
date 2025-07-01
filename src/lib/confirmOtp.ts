// lib/confirmOtp.ts
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

type ConfirmOtpProps = {
  email: string;
  code: string;
  userPoolId: string;
  clientId: string;
};

export async function confirmOtp({ email, code, userPoolId, clientId }: ConfirmOtpProps) {
  const poolData = { UserPoolId: userPoolId, ClientId: clientId };
  const userPool = new CognitoUserPool(poolData);
  const userData = { Username: email, Pool: userPool };
  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
