import React, { useEffect, useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { BiLogoGoogle } from "react-icons/bi";
import { AiFillApple } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdVerified } from "react-icons/md";
import images from "../Assets/FzqYPWfWIAEHXkI.jpeg";
import Modal from "react-modal";
import { AiFillHome } from "react-icons/ai";
import { RiNotification2Line } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { BiListCheck } from "react-icons/bi";
import { CgMoreO } from "react-icons/cg";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import axios from "axios";

export default function Home({ onSave }) {
  const [modal, setModal] = useState(false);
  const [tweets, setTweets] = useState(null); // Task State

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const [input, setInput] = useState({
    tweet: "",
  });

  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:5000/api/createTweet", input)
        .then((res) => {
          console.log(res.data);
          alert("You have successfully added a new tweet!");
        });
    } catch (err) {}
  };

  const getTweet = () => {
    try {
      axios.get("http://localhost:5000/api/getAllTweet").then((res) => {
        setTweets(res.data.tweet);
        console.log(res.data);
      });
    } catch (err) {}
  };

  useEffect(getTweet, []);

  return (
    <div>
      <div className="w-full bg-black text-white flex">
        <div className="w-[33%] pl-[20%] sticky top-0 h-[100vh]">
          <BsTwitter className="text-5xl text-white mt-2" />

          <span className="flex gap-4 cursor-pointer mt-8 ">
            <AiFillHome className="text-2xl" />
            <h1 className="text-xl font-bold">Home</h1>
          </span>

          <span className="flex gap-4 cursor-pointer mt-4">
            <FiSearch className="text-2xl" />
            <h1 className="text-xl font-bold">Explore</h1>
          </span>
          <span className="flex gap-4 cursor-pointer mt-8 ">
            <RiNotification2Line className="text-2xl" />
            <h1 className="text-xl font-bold">Notifications</h1>
          </span>
          <span className="flex gap-4 cursor-pointer mt-8 ">
            <AiOutlineMail className="text-2xl" />
            <h1 className="text-xl font-bold">Messages</h1>
          </span>
          <span className="flex gap-4 cursor-pointer mt-8 ">
            <BiListCheck className="text-2xl" />
            <h1 className="text-xl font-bold">List</h1>
          </span>
          <span className="flex gap-4 cursor-pointer mt-8 ">
            <BsBookmarkCheckFill className="text-2xl" />
            <h1 className="text-xl font-bold">Bookmarks</h1>
          </span>
          <span className="flex gap-4 cursor-pointer mt-8 ">
            <MdVerified className="text-2xl" />
            <h1 className="text-xl font-bold">Verified</h1>
          </span>
          <span className="flex gap-4 cursor-pointer mt-8 ">
            <CgProfile className="text-2xl" />
            <h1 className="text-xl font-bold">Profile</h1>
          </span>
          <span className="flex gap-4 cursor-pointer mt-8 ">
            <CgMoreO className="text-2xl" />
            <h1 className="text-xl font-bold">More</h1>
          </span>

          <button className=" bg-blue-500 py-[12px] mt-8 pl- white px-20 rounded-full font-bold flex ">
            Tweet
          </button>
        </div>

        <div className="w-[30%] border border-white cursor-pointer border-t-black px-3 sticky">
          <span className="flex justify-between">
            <h1 className="text-xl font-bold pt-2">Explore</h1>
            <CiSettings className="text-2xl mt-4" />
          </span>

          <span className="flex justify-evenly sticky top-0 z-50 bg-black ">
            <h1 className="text-xl font-bold pt-6 pb-6">Home</h1>
            <h1 className="text-xl font-bold pt-6 pb-6">Following</h1>
          </span>
          <hr />

          <button
            className=" bg-black text-blue-500 border-blue-200 ml-8 border py-[2px] mt-8 px-2 rounded-full font-bold flex "
            onClick={openModal}
          >
            Everyone <RiArrowDropDownLine className="text-blue-500 mt-1" />
          </button>

          <form onSubmit={onSubmit} action="">
            <input
              id="tweet"
              type="text"
              placeholder="What's happening?!!"
              value={input.text}
              onChange={onChangeHandler}
              className="ml-44 bg-black border-l-black border-hidden"
            />

            <CgProfile className="mb-8" />

            <hr className="" />

            <button className=" bg-blue-500 text-white text-xl mb-1 border-blue-200 ml-8 border py-[2px] mt-2 px-4 rounded-full font-bold flex ">
              Tweet
            </button>
          </form>

          <hr />

          <h1 className="text-blue-500 text-center">Show 153 Tweets</h1>

          <hr />

          <div className="flex pt-8 gap-4 flex-col">
            {tweets?.map((tweet) => (
              <div key={tweet.id} className="text-white">
                {tweet.tweet}
                {tweet.date}
                <hr />
              </div>
            ))}
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

        <div className="w-[37%] sticky top-10 z-50 px-3 py-2">
          <input
            type="search"
            name=""
            id=""
            placeholder="Search Twitter"
            className="rounded-full border ml-8 py-2 px-20 border-blue-300 bg-black"
          />
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
                    // boxShadow: "100% 100% 100% 100%",
                    backgroundColor: "#00000078",
                    zIndex: 100,
                  },
                }}
                className="absolute top-[100px] mx-4 shadow-white shadow-md rounded-[20px] lg:top-auto mt-[21vh] left-0 lg:left-[31%] lg:right-[50%] right-0 h-auto pb-12 overflow-y-auto overflow-auto bg-black z-50 outline-none border-0 flex flex-col justify-between "
                isOpen={modal}
                shouldCloseOnOverlayclick={true}
                onRequestClose={closeModal}
                ariaHideApp={false}
              >
                <h1 className="text-white py-2 px-4 text-2xl font-semibold cursor-pointer">
                  Choose audience
                </h1>
                <h1 className="text-white py-2 px-4 text-2xl font-semibold cursor-pointer flex gap-4">
                  <BiLogoGoogle className="mt-2 text-blue-500 cursor-pointer" />{" "}
                  Everyone around
                </h1>
                <h1 className="text-white py-2 px-4 text-2xl font-semibold cursor-pointer flex gap-4">
                  <BiLogoGoogle className="mt-2 text-blue-500 cursor-pointer" />{" "}
                  Twitter circle space
                </h1>
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

          <div className="border border-white rounded-2xl w-[50%] pl-3 mt-3 pb-3 ml-8 py-2">
            <span className="gap-4">
              <h1 className="text-xl font-bold">Trends for you.</h1>
              <h1 className="text-[12px]">
                Sign up now to get your own personalized timeline!
              </h1>

              <h1 className="text-white py-2 px-4 text-2xl font-semibold cursor-pointer">
                Choose audience
              </h1>
              <h1 className="text-white py-2 px-4 text-2xl font-semibold cursor-pointer flex gap-4">
                <BiLogoGoogle className="mt-2 text-blue-500 cursor-pointer" />{" "}
                Everyone around
              </h1>
              <h1 className="text-white py-2 px-4 text-2xl font-semibold cursor-pointer flex gap-4">
                <BiLogoGoogle className="mt-2 text-blue-500 cursor-pointer" />{" "}
                Twitter circle space
              </h1>
              <h1 className="text-white py-2 px-4 text-2xl font-semibold cursor-pointer">
                Choose audience
              </h1>
              <h1 className="text-white py-2 px-4 text-2xl font-semibold cursor-pointer flex gap-4">
                <BiLogoGoogle className="mt-2 text-blue-500 cursor-pointer" />{" "}
                Everyone around
              </h1>
              <h1 className="text-white py-2 px-4 text-2xl font-semibold cursor-pointer flex gap-4">
                <BiLogoGoogle className="mt-2 text-blue-500 cursor-pointer" />{" "}
                Twitter circle space
              </h1>
              <h1 className="text-white py-2 px-4 text-2xl font-semibold cursor-pointer">
                Choose audience
              </h1>
              <h1 className="text-white py-2 px-4 text-2xl font-semibold cursor-pointer flex gap-4">
                <BiLogoGoogle className="mt-2 text-blue-500 cursor-pointer" />{" "}
                Everyone around
              </h1>
              <h1 className="text-white py-2 px-4 text-2xl font-semibold cursor-pointer flex gap-4">
                <BiLogoGoogle className="mt-2 text-blue-500 cursor-pointer" />{" "}
                Twitter circle space
              </h1>
              <h1 className="text-white py-2 px-4 text-2xl font-semibold cursor-pointer">
                Choose audience
              </h1>
              <h1 className="text-white py-2 px-4 text-2xl font-semibold cursor-pointer flex gap-4">
                <BiLogoGoogle className="mt-2 text-blue-500 cursor-pointer" />{" "}
                Everyone around
              </h1>
              <h1 className="text-white py-2 px-4 text-2xl font-semibold cursor-pointer flex gap-4">
                <BiLogoGoogle className="mt-2 text-blue-500 cursor-pointer" />{" "}
                Twitter circle space
              </h1>
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
        </div>
      </div>
    </div>
  );
}
