// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "파일이 필요합니다" },
        { status: 400 }
      );
    }

    // 파일 버퍼로 변환
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // src와 동일한 레벨에 data 폴더 경로 생성
    const rootPath = join(process.cwd(), "src");
    const dataDir = join(dirname(rootPath), "data");
    
    // data 폴더가 없으면 생성
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    // 파일 저장 경로
    const filePath = join(dataDir, file.name);
    
    // 파일 저장
    await writeFile(filePath, buffer);
    
    return NextResponse.json({ 
      success: true,
      filePath: `/data/${file.name}` 
    });
    
  } catch (error) {
    console.error("파일 업로드 오류:", error);
    return NextResponse.json(
      { error: "파일 업로드에 실패했습니다" },
      { status: 500 }
    );
  }
}