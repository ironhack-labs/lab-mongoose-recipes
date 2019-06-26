let GetCodeGecha = (): string => {
   let fecha = new Date();
   let codeFecha = fecha.getFullYear().toString();
   let m = fecha.getMonth() + 1;
   codeFecha += (m < 10 ? "0" : "") + m.toString();
   m = fecha.getDate();
   codeFecha += (m < 10 ? "0" : "") + m.toString();
   m = fecha.getHours();
   codeFecha += " " + (m < 10 ? "0" : "") + m.toString();
   m = fecha.getMinutes();
   codeFecha += ":" + (m < 10 ? "0" : "") + m.toString();
   return codeFecha;
};

export default GetCodeGecha;
