type MoviePosterProps = {
    src: string;
    alt: string
}

export const MoviePoster = ({src, alt}: MoviePosterProps) => {
    return <img src={src} alt={alt} style={{ maxWidth: '180px', height: 'auto' }}/>
}
 
