"use client";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Comic } from "@/gql/generated/graphql";
import React from "react";
import ComicCard from "@/components/ComicCard";
import { useWindowSize } from "usehooks-ts";
import { Autoplay } from "swiper/modules";
interface HeroProps {
    items: Comic[];
}
function getNumberOfSlides(rootWidth: number) {
    if (rootWidth < 480) {
        return 2;
    }
    if (rootWidth < 640) {
        return 3;
    }
    if (rootWidth < 768) {
        return 4;
    }
    if (rootWidth < 1024) {
        return 5;
    }
    if (rootWidth < 1280) {
        return 6;
    }
    if (rootWidth < 1536) {
        return 7;
    } else {
        return 8;
    }
}

export default function Hero({ items }: HeroProps) {
    const ref = React.useRef<any>();
    const { width } = useWindowSize();

    return (
        <>
            <div className="flex gap-x-4 mb-4">
                <div className="w-unit-sm  bg-primary-400"></div>
                <div className="flex-1 text-2xl font-semibold text-primary-400">Truyện đề cử</div>
            </div>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                ref={ref}
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={getNumberOfSlides(width)}
            >
                {items.map((item) => (
                    <SwiperSlide
                        style={{
                            width: "auto",
                            marginRight: "20px",
                        }}
                        key={item._id}
                    >
                        <ComicCard comic={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
