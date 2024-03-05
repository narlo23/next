interface TextProps {
    size?: string;
    color?: string;
    paragraph?: string;
    weight?: string;
    props?: string;
}

function Text({size, color="main-navy", paragraph, weight, props=""}:TextProps) {
    return (
        <p className={`text-${size} text-${color} font-${weight} ${props}`}>{paragraph}</p>
    )
}

export default Text;