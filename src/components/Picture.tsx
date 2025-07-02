import { CSSProperties } from "react";

interface PictureProps {
    webpSrc: string;
    fallbackSrc: string;
    alt?: string;
    style?: CSSProperties;
    className?: string;
}

const Picture = ({ webpSrc, fallbackSrc, alt = "", style, className }: PictureProps) => {
    return (
        <picture>
            <source srcSet={webpSrc} type="image/webp" />
            <img 
                src={fallbackSrc} 
                alt={alt} 
                style={style}
                className={className}
            />
        </picture>
    );
};

export default Picture;