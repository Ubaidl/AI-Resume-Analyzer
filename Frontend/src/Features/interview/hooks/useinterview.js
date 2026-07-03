import { useContext } from "react";
import { interviewcontext } from "../interview.context";
import { generateinterview } from "../services/interview.api";

 export const useinterview = ()=>{
    const context = useContext(interviewcontext )

    if(!context){
        throw new Error("userinterview must be within inside")
    }
    const {loading,setloading,report,setreport,reports,setreports} = context


    const  generateReport =async ({resume,jobDescription})=>{
        console.log("generateReport called");
        
        setloading(true)
        try{
            const response = await generateinterview({
    resume,
    jobDescription,
})

setreport(response.interviewReport)

return response.interviewReport

        }catch (error){
            console.log(error)
            throw error;
            

        }finally{
            setloading(false)
        }

    }
    return {
    loading,
    report,
    reports,
    generateReport,
}
}