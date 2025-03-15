export const ResultCard = ({ result }: { result: string }) => {
    // Check if the result message indicates success
    console.log("hi called")
    if(result=" "){
        return <>
        </>
    }
    const isSuccess = result.toLowerCase().includes("success");
  
    return (
      <div
        className={`p-4 rounded-lg shadow-md text-white ${
          isSuccess ? "bg-green-500" : "bg-red-500"
        }`}
      >
        <p className="text-lg font-semibold">{result}</p>
      </div>
    );
  };