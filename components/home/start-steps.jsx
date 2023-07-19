import styles from "@/app/index";

const StartSteps = ({ number, text }) => (
    <div className={`${styles.flexCenter} flex-row`}>
      <div
        className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] bg-red-/50 backdrop-blur-xl shadow`}
      >
        <p className="font-bold text-[20px] text-gray-600">
          {number}
        </p>
      </div>
      <p className="flex-1 ml-[30px] text-gray-700 md:text-xl">
        {text}
      </p>
    </div>
  );
  
  export default StartSteps;