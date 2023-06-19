


const animations = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0 , x: 100},
};

export default function Transition(){
    return(
        <motion.div 
            variants={animations} 
            initial="initial" 
            animate="animate" 
            exit="exit" 
            transition={{ 
                duration : 0.3,
                ease: "easeInOut",
                delay: 0.2,
            }} 
        >
        </motion.div>
    )
}