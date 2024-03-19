interface TextProps {
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    color?: string;
    paragraph?: string;
    weight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
}

function Text({size = "base", color="main-navy", paragraph, weight = "normal"}:TextProps) {
    return (
        <p className={`text-${size} ${color} font-${weight}`}>{paragraph}</p>
    )
}

export default Text;