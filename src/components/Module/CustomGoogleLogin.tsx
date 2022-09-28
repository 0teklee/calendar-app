import { useGoogleLogin } from "@react-oauth/google";
import Cookie from "js-cookie";
import { Dispatch, SetStateAction } from "react";

const CustomGoogleLogin = ({
  setState,
}: {
  setState: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const { gapi } = window;
  const login = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (codeResponse) => {
      Cookie.set("access_token", codeResponse.access_token, {
        expires: 1,
      });
      gapi.client.setToken({ access_token: codeResponse.access_token });
      setState(true);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <button
      className="p-4 bg-blue-300 rounded-lg text-white font-bold  hover:bg-yellow-500"
      onClick={(e) => {
        e.preventDefault();
        login();
      }}
    >
      구글 캘린더 로그인 하기
    </button>
  );
};

export default CustomGoogleLogin;
