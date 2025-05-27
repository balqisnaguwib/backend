// Next, React, Tw
import Image from "next/image";

// Icon
import { Icon } from "@iconify/react/dist/iconify.js";

const Explore = () => {
  const FOR_YOU_DATA = [
    {
      image:
        "https://lh3.googleusercontent.com/p/AF1QipN8jVPkDCE_6xPUotxNuDvEtirrGYzmKsmGk6F0=w408-h306-k-no",
      title: "Nasi Lemak Wanjo Kg Bharu",
    },
    {
      image:
        "https://lh3.googleusercontent.com/p/AF1QipN8jVPkDCE_6xPUotxNuDvEtirrGYzmKsmGk6F0=w408-h306-k-no",
      title: "Nasi Lemak Wanjo Kg Bharu",
    },
    {
      image:
        "https://lh3.googleusercontent.com/p/AF1QipN8jVPkDCE_6xPUotxNuDvEtirrGYzmKsmGk6F0=w408-h306-k-no",
      title: "Nasi Lemak Wanjo Kg Bharu",
    },
  ];
  return (
    <div className="h-full flex flex-col justify-between px-6 py-16">
      <div className="h-1/3 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <p className="flex items-center gap-2 font-bold text-lg">
            For you in{" "}
            <span className="flex items-center text-[#ff5e00]">
              <Icon icon="bytesize:location" className="text-[20px]" />
              Kuala Lumpur
            </span>
          </p>
          <button
            type="button"
            className="rounded-full text-sm py-1.5 px-4 border border-gray-300 font-medium cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-1"
          >
            <Icon icon="mdi:compass" className="text-gray-600" />
            Explore
          </button>
        </div>
        <div className="flex-grow flex justify-between gap-3">
          {FOR_YOU_DATA?.map((o: { image: string; title: string }, index) => (
            <div
              key={index}
              className="w-1/3 rounded-xl relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <Image
                src={o.image}
                alt={o.title}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm font-medium absolute bottom-3 left-3 text-white z-20 drop-shadow-md">
                {o.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-1/3 flex flex-col gap-3 mt-4">
        <div className="flex justify-between items-center">
          <p className="flex items-center gap-2 font-bold text-lg">
            Jump back in
          </p>
          <button
            type="button"
            className="rounded-full text-sm py-1.5 px-4 border border-gray-300 font-medium cursor-pointer hover:bg-gray-50 transition-colors"
          >
            View all
          </button>
        </div>
        <div className="flex-grow flex justify-between gap-3">
          {FOR_YOU_DATA?.map((o: { image: string; title: string }, index) => (
            <div
              key={index}
              className="w-1/3 rounded-xl relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80 z-10"></div>
              <Image
                src={o.image}
                alt={o.title}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm font-medium absolute bottom-3 left-3 text-white z-20 drop-shadow-md">
                {o.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-1/3 flex flex-col gap-3 mt-4">
        <div className="flex justify-between items-center">
          <p className="flex items-center gap-2 font-bold text-lg">
            Get inspired
          </p>
          <button
            type="button"
            className="rounded-full text-sm py-1.5 px-4 border border-gray-300 font-medium cursor-pointer hover:bg-gray-50 transition-colors"
          >
            See all
          </button>
        </div>
        <div className="flex-grow flex justify-between gap-3">
          {FOR_YOU_DATA?.map((o: { image: string; title: string }, index) => (
            <div
              key={index}
              className="w-1/3 rounded-xl relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80 z-10"></div>
              <Image
                src={o.image}
                alt={o.title}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm font-medium absolute bottom-3 left-3 text-white z-20 drop-shadow-md">
                {o.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
