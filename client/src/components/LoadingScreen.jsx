import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingScreen = () => {
  return (
    <main className="flex">
      <div className="h-screen w-[10%] md:w-[20vw] bg-[#ebebeb] md:pt-10 dark:bg-gray-600">
        <Skeleton
          baseColor="#bcbcbc"
          highlightColor="#eeeeee"
          style={{ height: "10%", width: "80%" }}
        />
        <div className="md:mt-6 md:h-[95%]">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton
              key={index}
              baseColor="#bcbcbc"
              highlightColor="#eeeeee"
              style={{ height: "5%", width: "80%", marginBottom: "1rem" }}
            />
          ))}
        </div>
      </div>
      <section className="h-100vh mt-10">
        <div className="md:h-[100vh] w-[100%] md:w-[80vw] p-4 ">
          <Skeleton
            baseColor="#bcbcbc"
            highlightColor="#eeeeee"
            style={{ height: "20%", width: "100%" }}
          />
          <div className="flex ">
            {Array.from({ length: 4 }, (_, index) => (
              <div className="md:w-[100%] md:h-20 md:my-4" key={index}>
                <Skeleton
                  baseColor="#bcbcbc"
                  highlightColor="#eeeeee"
                  style={{ height: "100%", width: "80%", marginBottom: "1rem" }}
                />
              </div>
            ))}
          </div>


          <div className="md:w-[100%] h-[50%] md:mt-10">
            <Skeleton
              baseColor="#bcbcbc"
              highlightColor="#eeeeee"
              style={{ height: "100%", width: "100%", marginBottom: "1rem" }}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoadingScreen;
