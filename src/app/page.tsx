import Link from "next/link";

export default function Home() {
  return (
    <div style={{width:'100%', height:'100vh', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{padding: '20px 10px 20px 10px', backgroundColor: '#000', borderRadius: '16px', cursor: 'pointer'}}>
        <Link href="/project" style={{textDecoration: 'none', color: 'white'}}>          
            재혁님 테스트 업로드 하러 가자
        </Link>
      </div>
    </div>
  );
}
