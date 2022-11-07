const Avatar = ({ url }) => {
    return (
        // AVATAR WRAPPER
        <div 
        className="avatar-wrapper"
        style={{ 
            width: "80px",
            height: "80px",
            position: "relative"
            }}>
            {/* IMAGE CONTAINER  */}
            <div
                style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundSize: "cover",
                    backgroundImage: `url('${url ? url : 'face.jpeg'}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center top",
                    position: 'absolute'
                }}
            ></div>
            {/* CONTACT STATUS LIGHT */}
            <div
                className="bg-warning"
                style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    position: "absolute",
                    bottom: "0",
                    right: "0"
                }}
            ></div>
        </div>
    );
};

export default Avatar;
