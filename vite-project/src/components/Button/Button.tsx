
type ButtonProps = {
    text: string;
    onClick?: () => void;
    type?: "submit" | "reset" | "button";
}

export const Button = ({ text, onClick, type }: ButtonProps) => {

    const handleClick = () => {
        if (onClick) {
            onClick(); 
        }
    };
    
    return <button onClick={handleClick} type={type}>{text}</button>;

}
 
