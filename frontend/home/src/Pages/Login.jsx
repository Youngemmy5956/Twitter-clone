import React, { useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { BiLogoGoogle } from "react-icons/bi";
import { AiFillApple } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdVerified } from "react-icons/md";
import images from "../Assets/FzqYPWfWIAEHXkI.jpeg";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      email: email,
      password: password,
    };

    try {
      await axios
        .post("http://localhost:5000/api/users/loginUser", data)
        .then((res) => {
          console.log(res.data.token);
          localStorage.setItem("token", JSON.stringify(res.data.token));

          navigate("/");
          setLoading(false);
          alert("Login successful");
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };
  return (
    <div>
      <div className="bg-blue-400 px-96 py-2 justify-between text-white flex sticky">
        <span>
          <h1 className="text-2xl font-bold">Don’t miss what’s happening</h1>

          <h1 className="text-sm">People on Twitter are the first to know.</h1>
        </span>

        <span className="">
          <button
            className="border rounded-full py-2 px-6 font-bold "
            onClick={openModal}
          >
            Log in
          </button>
          <button className="border rounded-full py-2 px-6 bg-white text-black font-bold ">
            <a href="/signup"> Sign up</a>
          </button>
        </span>
      </div>

      <div className="w-full bg-black text-white flex">
        <div className="w-[33%] pl-[20%] sticky">
          <BsTwitter className="text-5xl text-white mt-2" />

          <span className="flex gap-4 cursor-pointer mt-8 ">
            <FiSearch className="text-2xl" />
            <h1 className="text-xl font-bold">Explore</h1>
          </span>

          <span className="flex gap-4 cursor-pointer mt-4">
            <FiSettings className="text-2xl" />
            <h1 className="text-xl font-bold">Settings</h1>
          </span>
        </div>

        <div className="w-[30%] border border-white cursor-pointer border-t-black px-3 sticky">
          <span className="flex justify-between sticky">
            <h1 className="text-xl font-bold pt-2">Explore</h1>
            <CiSettings className="text-2xl mt-4" />
          </span>

          <span className="flex pt-8 gap-4">
            <CgProfile className="mt-2" />
            <h1 className="text-base mt-1 flex gap-1 ">
              Nwamini Emmanuel <MdVerified className="text-blue-600 mt-1" />{" "}
              <i>@FabrizioRomano · 8h</i>{" "}
            </h1>
          </span>
          <span className="">
            <h1 className="text-base font-normal pt-1 pl-8">
              Arsenal have submitted new official bid for Declan Rice after West
              Ham choice to reject £80m plus £10m bid from Man City 🚨⚪️🔴 #AFC
            </h1>

            <h1 className="text-base font-normal pt-4 pl-8">
              Arsenal third bid is now on the table for £100m fixed fee plus £5m
              add-ons, as @David_Ornstein reported.
            </h1>

            <h1 className="text-base font-normal pt-4 pl-8">
              West Ham, waiting to hear from Man City.
            </h1>
          </span>

          <div className="rounded-3xl border-white mt-6 mb-4 pl-8">
            <img src={images} alt="" className="rounded-2xl" />
          </div>

          <hr />

          <span className="flex pt-8 gap-4">
            <CgProfile className="mt-2" />
            <h1 className="text-base mt-1 flex gap-1 ">
              Nwamini Emmanuel <MdVerified className="text-blue-600 mt-1" />{" "}
              <i>@FabrizioRomano · 8h</i>{" "}
            </h1>
          </span>
          <span className="">
            <h1 className="text-base font-normal pt-1 pl-8">
              Arsenal have submitted new official bid for Declan Rice after West
              Ham choice to reject £80m plus £10m bid from Man City 🚨⚪️🔴 #AFC
            </h1>

            <h1 className="text-base font-normal pt-4 pl-8">
              Arsenal third bid is now on the table for £100m fixed fee plus £5m
              add-ons, as @David_Ornstein reported.
            </h1>

            <h1 className="text-base font-normal pt-4 pl-8">
              West Ham, waiting to hear from Man City.
            </h1>
          </span>

          <div className="rounded-3xl border-white mt-6 mb-4 pl-8">
            <img src={images} alt="" className="rounded-2xl" />
          </div>
        </div>

        <div className="w-[37%] px-3 py-2">
          <div className="border border-white rounded-2xl w-[50%] pl-3 mt-3 pb-3 ml-8 py-2">
            <span className="gap-4">
              <h1 className="text-xl font-bold">New to Twitter?</h1>
              <h1 className="text-[12px]">
                Sign up now to get your own personalized timeline!
              </h1>
              <button className=" bg-white py-[8px] mt-3 text-black px-12 rounded-full font-bold flex  w-[90%]">
                <BiLogoGoogle className="mt-1" /> Sign up with Google
              </button>

              <button className=" bg-white py-[8px] mt-3 text-black px-12 rounded-full font-bold flex  w-[90%]">
                <AiFillApple className="mt-1" /> Sign up with Apple
              </button>

              <Modal
                style={{
                  overlay: {
                    position: "fixed",
                    top: "0%",
                    left: "0%",
                    right: "0%",
                    bottom: "0%",
                    backgroundColor: "#0000007",
                    zIndex: 100,
                  },
                }}
                className="absolute top-[100px] mx-4 rounded-[5px] lg:top-auto mt-[30vh] left-0 lg:left-[32%] lg:right-[35%] right-0 h-auto pb-12 overflow-y-auto overflow-auto bg-black z-50 outline-none border-0 flex flex-col justify-between shadow-[5px_5px_30px_0px_#00000040]"
                isOpen={modal}
                shouldCloseOnOverlayclick={true}
                onRequestClose={closeModal}
                ariaHideApp={false}
              >
                <form
                  onSubmit={onSubmit}
                  className="flex flex-col px-32 gap-4 mt-12"
                >
                  <BsTwitter className="text-5xl text-white mt-2 ml-32" />
                  <h1 className="text-2xl text-white font-bold pl-10">
                    Sign in your account
                  </h1>
                  <button className=" bg-white py-[8px] mt-3 text-black pl-[75px]  px-12 rounded-full font-bold flex  w-[90%]">
                    <BiLogoGoogle className="mt-1" /> Sign in with Google
                  </button>

                  <button className=" bg-white py-[8px] mt-3 text-black pl-[75px]  px-12 rounded-full font-bold flex  w-[90%]">
                    <AiFillApple className="mt-1" /> Sign in with Apple
                  </button>
                  <input
                    type="email"
                    value={email}
                    placeholder="Email address"
                    onChange={onChangeEmail}
                    className="h-14 border-2 w-[88%]  text-white bg-black border-blue-500 rounded-[5px] outline-none px-6"
                  />

                  <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={onChangePassword}
                    className="h-14 border-2 w-[88%] text-white bg-black border-blue-500 rounded-[5px] outline-none px-6"
                  />

                  <button className="bg-black pr-10 text-white text-lg h-14 rounded-[5px] roboto">
                    Sign in
                  </button>
                  <button className=" bg-white py-[8px] mt-3 text-black px-12 pl-[90px] rounded-full font-bold flex  w-[90%]">
                    Forget password ?
                  </button>
                </form>
              </Modal>
              <button className=" bg-white py-[8px] mt-3 text-black px-12 rounded-full font-bold w-[90%] ">
                Create account
              </button>

              <h1 className="text-sm pt-3">
                By signing up, you agree to the{" "}
                <b className="text-blue-600 hover:underline cursor-pointer">
                  Terms of Service
                </b>{" "}
                and{" "}
                <b className="text-blue-600 hover:underline cursor-pointer">
                  Privacy Policy,
                </b>{" "}
                including{" "}
                <b className="text-blue-600 hover:underline cursor-pointer">
                  Cookie Use.
                </b>
              </h1>
            </span>
          </div>

          <h1 className=" pt-4 ml-12 ">
            Terms of Service Privacy Policy Cookie Policy <br /> Accessibility
            Ads info More... © 2023 X Corp.
          </h1>
        </div>
      </div>
    </div>
  );
}
