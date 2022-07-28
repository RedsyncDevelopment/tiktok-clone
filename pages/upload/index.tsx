import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactNode, useContext, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ThemeContext } from "../../states/context/theme/ThemeContext";
import { BASE_URL } from "../../utils";
import { topics } from "../../utils/constants";

interface UploadProps {
  children?: ReactNode;
}

const Upload: NextPage<UploadProps> = () => {
  const { dark } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<Blob | string>("");
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  const router = useRouter();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (
      fileTypes.includes(selectedFile?.type) &&
      selectedFile.size < 40783985
    ) {
      setIsLoading(false);
      setVideoSrc(URL.createObjectURL(selectedFile));
      setVideoAsset(selectedFile);
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async (e: any) => {
    if (caption && category && videoAsset) {
      setSavingPost(true);
      const formData = new FormData();
      formData.append("file", videoAsset);
      formData.append("upload_preset", "my_uploads");
      const data = await axios.post(
        "https://api.cloudinary.com/v1_1/redsync/video/upload",
        formData
      );
      await axios.post(`${BASE_URL}/api/post`, {
        post: {
          caption: caption,
          video: data?.data.url,
          topic: category,
        },
      });
      router.push("/");
    }
  };

  return (
    <>
      <div
        className={`flex w-full h-[88vh] pb-10 justify-center overflow-auto ${
          dark ? "bg-primary-dark-400" : "bg-primary-light-400"
        }`}
      >
        <div
          className={`${
            dark ? "bg-primary-dark-200" : "bg-primary-light-200"
          } rounded-xl p-10 h-[120vh] lg:h-full flex flex-col gap-6 pb-4 lg:flex-row lg:px-16 lg:py-12 lg:gap-8`}
        >
          <div>
            <div>
              <p className="text-2xl font-bold">Upload Video</p>
              <p className="text-md text-gray-400 mt-1 ">
                Post a video to your account
              </p>
            </div>
            <div className="border-dashed border-4 rounded-xl border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
              {isLoading ? (
                <div>Uploading</div>
              ) : (
                <div>
                  {videoAsset ? (
                    <div>
                      <video
                        src={videoSrc}
                        loop
                        controls
                        className="rounded-xl h-[450px] mt-16 bg-black"
                      ></video>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col items-center justify-center">
                          <p className="font-bold text-xl">
                            <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                          </p>
                          <p className="text-xl font-semibold">Upload video</p>
                        </div>
                        <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                          MP4 or WebM or ogg <br />
                          720x1280 or higher
                          <br />
                          Up to 10 minutes
                          <br />
                          Less than 40MB
                        </p>
                        <p className="bg-[#f51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                          Select File
                        </p>
                      </div>
                      <input
                        type="file"
                        name="upload-video"
                        className="w-0 h-0"
                        onChange={uploadVideo}
                      ></input>
                    </label>
                  )}
                </div>
              )}
              {wrongFileType && (
                <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
                  Please select a video file
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-10 lg:pt-24">
            <label className="text-md font-medium">Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="rounded outline-none text-md border-2 border-gray-200 p-2"
            ></input>
            <label className="text-md font-medium">Choose a Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded-none cursor-pointer"
            >
              {topics.map((topic) => (
                <option
                  key={topic.name}
                  className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                  value={topic.name}
                >
                  {topic.name}
                </option>
              ))}
            </select>
            <div className="flex gap-6 mt-10">
              <button
                onClick={() => {}}
                type="button"
                className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
              >
                Discard
              </button>
              <button
                onClick={handlePost}
                type="button"
                className="bg-[#f51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
