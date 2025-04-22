"use client";

export default function Home() {

  return (
    <div className="flex flex-col items-center h-screen">
      {/* <h1 className="text-2xl text-center text-emerald-900 p-5"> Pawfect Match </h1> */}
      <img src="pawfectmatch.png" alt="Pawfect Match Logo" className="w-auto h-auto"/>

      <div className="grid grid-cols-3 gap-4 p-5">
        <div className="bg-white shadow-md rounded-lg p-6 w-100"> 
          <h2 className="text-2xl text-center mb-5"> Mission Statement </h2>
          <h3 className="text-sm text-center"> 
            Pawfect Match is a C2C website that helps pet owners rehome their pets by connecting them with people looking to adopt.
            Some owners may need to give up their pets due to moving, financial struggles, or other life changes, 
            while many individuals prefer adoption over buying from breeders or pet stores. 
            This website will make the process easier and safer for both sides.
          </h3>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 w-100">
          <h2 className="text-2xl text-center mb-5"> How it works </h2>
            <ol className="list-decimal list-inside">
              <li>Register as a lister or adopter</li>
              <li>Create a pet profile</li>
              <li>Browse available pets</li>
              <li>Contact the owner to arrange a meeting</li>
              <li>Complete the adoption process</li>
            </ol>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 w-100">
            <div className="flex justify-center mt-5">
              <a href="/Login" className="shadow-md p-2 rounded">Login</a>
            </div> 
            <div className="flex justify-center mt-5">
              <a href="/Register" className="shadow-md p-2 rounded">Register</a>
            </div>          
        </div>
      </div>
    </div>
  );
}
