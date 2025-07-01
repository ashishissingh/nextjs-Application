import axios from "axios";

export async function sendOrgOwnerConfirmation(email: string, orgid: string, apiUrl: string) {
  const orgData = { email };

  try {
    await axios.post(apiUrl + "sendOrgConfirmation", orgData);
    console.log("Confirmation email sent successfully");
  } catch (err) {
    console.error("Error sending confirmation email:", err);
  }

  const jdata = {
    type: "message",
    orgid,
  };

  try {
    await axios.post(apiUrl + "notify", jdata);
    console.log("Confirmation notification sent successfully");
  } catch (err) {
    console.error("Error sending confirmation notification:", err);
  }
}
