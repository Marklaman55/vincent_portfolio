import { motion } from "motion/react";

const NetworkBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="relative h-full w-full">
        <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 1440 320">
          <path fill="opacity-10" fillOpacity={0.05} d="M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,112C672,96,768,128,864,160C960,192,1056,224,1152,208C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,352,1248,384,1152,416C1056,448,960,416,864,384C768,352,672,320,576,288C480,256,384,224,288,192C192,160,96,128,48,96L0,64Z"></path>
        </svg>
      </div>
      {/* Animated dots */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute"
          style={{
            top: "10%",
            left: "15%",
            width: "4px",
            height: "4px",
            background: "currentColor",
            opacity: "0.3",
            borderRadius: "50%",
          }}
        >
          <motion.div
            className="absolute"
            style={{
              top: "-6px",
              left: "-6px",
              width: "16px",
              height: "16px",
              border: "1px solid currentColor",
              opacity: "0.1",
              borderRadius: "50%",
            }}
          />
          <motion.div
            className="absolute"
            style={{
              top: "-12px",
              left: "-12px",
              width: "28px",
              height: "28px",
              border: "1px solid currentColor",
              opacity: "0.05",
              borderRadius: "50%",
            }}
          />
        </motion.div>

        <motion.div
          className="absolute"
          style={{
            top: "30%",
            left: "35%",
            width: "3px",
            height: "3px",
            background: "currentColor",
            opacity: "0.2",
            borderRadius: "50%",
          }}
        >
          <motion.div
            className="absolute"
            style={{
              top: "-5px",
              left: "-5px",
              width: "13px",
              height: "13px",
              border: "1px solid currentColor",
              opacity: "0.1",
              borderRadius: "50%",
            }}
          />
        </motion.div>

        <motion.div
          className="absolute"
          style={{
            top: "50%",
            left: "70%",
            width: "5px",
            height: "5px",
            background: "currentColor",
            opacity: "0.4",
            borderRadius: "50%",
          }}
        >
          <motion.div
            className="absolute"
            style={{
              top: "-8px",
              left: "-8px",
              width: "21px",
              height: "21px",
              border: "1px solid currentColor",
              opacity: "0.15",
              borderRadius: "50%",
            }}
          />
          <motion.div
            className="absolute"
            style={{
              top: "-16px",
              left: "-16px",
              width: "37px",
              height: "37px",
              border: "1px solid currentColor",
              opacity: "0.08",
              borderRadius: "50%",
            }}
          />
        </motion.div>

        <motion.div
          className="absolute"
          style={{
            top: "70%",
            left: "20%",
            width: "4px",
            height: "4px",
            background: "currentColor",
            opacity: "0.3",
            borderRadius: "50%",
          }}
        >
          <motion.div
            className="absolute"
            style={{
              top: "-6px",
              left: "-6px",
              width: "16px",
              height: "16px",
              border: "1px solid currentColor",
              opacity: "0.1",
              borderRadius: "50%",
            }}
          />
        </motion.div>

        <motion.div
          className="absolute"
          style={{
            top: "80%",
            left: "60%",
            width: "2px",
            height: "2px",
            background: "currentColor",
            opacity: "0.15",
            borderRadius: "50%",
          }}
        >
          <motion.div
            className="absolute"
            style={{
              top: "-4px",
              left: "-4px",
              width: "10px",
              height: "10px",
              border: "1px solid currentColor",
              opacity: "0.08",
              borderRadius: "50%",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default NetworkBackground;