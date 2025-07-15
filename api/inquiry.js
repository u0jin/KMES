const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    return res.status(200).json({ 
      success: true, 
      message: 'API가 정상 작동합니다!',
      timestamp: new Date().toISOString()
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, company, email, phone, subject, message, type, product } = req.body;
    
    // 필수 필드 검증
    if (!name || !company || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: '필수 정보가 누락되었습니다. 이름, 회사명, 이메일, 제목, 문의내용을 모두 입력해주세요.' 
      });
    }
    
    // Gmail SMTP 설정 (더 안전한 방식)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.EMAIL_USER || 'kmes.kmkim@gmail.com',
        pass: process.env.EMAIL_PASS || 'ettr gcqk ijht aecv'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    
    // 이메일 제목/본문 구성
    let emailSubject = '한국엠이에스 문의사항';
    if (subject) {
      emailSubject += ` - ${subject}`;
    }
    let emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">한국엠이에스 문의사항 접수</h2>
        <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
        <h3 style="color: #374151;">문의자 정보</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">이름</td><td style="padding: 8px; border: 1px solid #e5e7eb;">${name}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">회사명</td><td style="padding: 8px; border: 1px solid #e5e7eb;">${company}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;">이메일</td><td style="padding: 8px; border: 1px solid #e5e7eb;">${email}</td></tr>
          ${phone ? `<tr><td style=\"padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;\">연락처</td><td style=\"padding: 8px; border: 1px solid #e5e7eb;\">${phone}</td></tr>` : ''}
          ${type ? `<tr><td style=\"padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;\">문의 유형</td><td style=\"padding: 8px; border: 1px solid #e5e7eb;\">${type}</td></tr>` : ''}
          ${product ? `<tr><td style=\"padding: 8px; border: 1px solid #e5e7eb; background: #f9fafb; font-weight: bold;\">관련 제품</td><td style=\"padding: 8px; border: 1px solid #e5e7eb;\">${product}</td></tr>` : ''}
        </table>
        <h3 style="color: #374151;">문의 내용</h3>
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h4 style="margin: 0 0 10px 0; color: #1e40af;">${subject}</h4>
          <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="color: #6b7280; font-size: 14px;">이 문의사항에 대해 빠른 시일 내에 답변드리겠습니다.<br>감사합니다.</p>
        <div style="background: #1e40af; color: white; padding: 15px; border-radius: 8px; margin-top: 20px;">
          <p style="margin: 0; font-weight: bold;">한국엠이에스 (KOREA MES CORP.)</p>
          <p style="margin: 5px 0 0 0; font-size: 14px;">TEL: 02-2615-1265 | FAX: 02-2615-1266<br>서울특별시 영등포구 선유로9길 10 문래 SK V1 center</p>
        </div>
      </div>
    `;
    
    // 메일 발송
    const mailOptions = {
      from: process.env.EMAIL_USER || 'kmes.kmkim@gmail.com',
      to: 'kmes.kmkim@gmail.com',
      subject: emailSubject,
      html: emailBody,
      replyTo: email
    };
    await transporter.sendMail(mailOptions);
    
    // 성공 응답
    res.status(200).json({ 
      success: true, 
      message: '문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.' 
    });
    
  } catch (error) {
    console.error('이메일 발송 실패:', error);
    res.status(500).json({ 
      success: false, 
      message: '문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      error: error.message
    });
  }
}; 