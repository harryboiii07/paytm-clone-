
// eslint-disable-next-line react/prop-types
export function Bottomwarning({label,to,linktext}){
  return <div className="py-2 text-sm flex justify-center">
    <div className="">{label}</div>
    <a href={to} className="pointer underline pl-1 cursor-pointer">{linktext}</a>
  </div> 
}