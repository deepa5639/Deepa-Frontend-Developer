import React, { useEffect } from 'react';
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";

export const useScroll = (thresh = 0.1) => {
    const controls = useAnimation();
    const [element, view] = useInView({ threshold: thresh });
    useEffect(() => {
        if (true) {
            controls.start("show");
        } else {
            controls.start("hidden");
        }

    }, [])
    return [element, controls];

}