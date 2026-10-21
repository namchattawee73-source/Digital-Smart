import React, { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, XCircle, Sparkles, RefreshCw, Eye, EyeOff } from 'lucide-react';

// 1. Password Strength Tester & Generator
export const PasswordCheckerTool: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  // Evaluate password
  const hasLength = password.length >= 12;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  let strengthScore = 0;
  if (password.length >= 8) strengthScore += 1;
  if (password.length >= 12) strengthScore += 1;
  if (password.length >= 16) strengthScore += 1;
  if (hasUpper && hasLower) strengthScore += 1;
  if (hasNumber) strengthScore += 1;
  if (hasSpecial) strengthScore += 1;

  const getStrengthLabel = () => {
    if (!password) return { text: 'ยังไม่ได้ระบุ', color: 'text-slate-400', time: '-' };
    if (password.toLowerCase().includes('password') || password === '123456' || password === '12345678') {
      return { text: 'อันตรายมาก! (รหัสยอดฮิตถูกเจาะทันที)', color: 'text-rose-600', time: '0.0001 วินาที' };
    }
    if (strengthScore <= 2) return { text: 'อ่อนแอมาก (เจาะง่าย)', color: 'text-rose-500', time: 'น้อยกว่า 1 นาที' };
    if (strengthScore <= 4) return { text: 'ปานกลาง (พอใช้ได้)', color: 'text-amber-500', time: 'ประมาณ 3 สัปดาห์' };
    if (strengthScore <= 5) return { text: 'แข็งแกร่ง (ปลอดภัยดี)', color: 'text-emerald-600', time: 'มากกว่า 3,000 ปี' };
    return { text: 'แข็งแกร่งระดับสูงสุด (Passphrase ยอดเยี่ยม)', color: 'text-indigo-600', time: 'มากกว่า 100 ล้านปี' };
  };

  const samplePassphrases = [
    'Coffee#Skywalker2026',
    'Mango$Thunder*88',
    'Bangkok$ReadsFast!9',
    'BlueGuitar_RunsWell7'
  ];

  const handleGenerate = () => {
    const random = samplePassphrases[Math.floor(Math.random() * samplePassphrases.length)];
    setPassword(random);
  };

  const status = getStrengthLabel();

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-600" />
          ทดลองวัดความแข็งแกร่งของรหัสผ่าน
        </h4>
        <button
          onClick={handleGenerate}
          className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          สุ่ม Passphrase ตัวอย่าง
        </button>
      </div>

      <div className="relative mb-3">
        <input
          type={showPass ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="ลองพิมพ์รหัสผ่านของคุณที่นี่..."
          className="w-full px-4 py-2.5 pr-10 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={() => setShowPass(!showPass)}
          className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
        >
          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {password && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-600">ระดับความปลอดภัย:</span>
            <span className={`font-semibold ${status.color}`}>{status.text}</span>
          </div>

          <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-lg border border-slate-200">
            <span className="text-slate-600">เวลาที่คอมพิวเตอร์ใช้เจาะสุ่ม:</span>
            <span className="font-semibold text-slate-900 tabular-nums">{status.time}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
            <div className={`flex items-center gap-1.5 ${hasLength ? 'text-emerald-600' : 'text-slate-400'}`}>
              {hasLength ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
              <span>ยาว 12+ ตัว</span>
            </div>
            <div className={`flex items-center gap-1.5 ${hasUpper && hasLower ? 'text-emerald-600' : 'text-slate-400'}`}>
              {hasUpper && hasLower ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
              <span>ตัวพิมพ์ใหญ่+เล็ก</span>
            </div>
            <div className={`flex items-center gap-1.5 ${hasNumber ? 'text-emerald-600' : 'text-slate-400'}`}>
              {hasNumber ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
              <span>มีตัวเลข</span>
            </div>
            <div className={`flex items-center gap-1.5 ${hasSpecial ? 'text-emerald-600' : 'text-slate-400'}`}>
              {hasSpecial ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
              <span>มีสัญลักษณ์ (!@#$)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 2. Headline & News Credibility Inspector
export const HeadlineCheckerTool: React.FC = () => {
  const sampleHeadlines = [
    {
      text: 'ช็อกทั้งประเทศ! ดื่มน้ำมะนาวต้มสุกติดต่อกัน 3 วัน มะเร็งหายขาด 100% หมอทั่วโลกปิดข่าวเงียบ',
      risk: 'high',
      flags: ['ใช้คำกระตุ้นอารมณ์รุนแรง (ช็อกทั้งประเทศ)', 'อ้างสรรพคุณมหัศจรรย์เกินจริง (หาย 100%)', 'สร้างทฤษฎีสมคบคิด (หมอปิดข่าว)', 'ไม่มีชื่อแพทย์หรือสถาบันวิจัยรับรอง'],
      verdict: 'มีความเป็นไปได้สูงมากว่าเป็นข่าวปลอม (Fake Health News)'
    },
    {
      text: 'กระทรวงสาธารณสุข แถลงพบผู้ป่วยไข้หวัดใหญ่เพิ่มขึ้น 15% พร้อมเตือนประชาชนกลุ่มเสี่ยงฉีดวัคซีนป้องกัน',
      risk: 'low',
      flags: ['ระบุหน่วยงานรับผิดชอบชัดเจน (กระทรวงสาธารณสุข)', 'ภาษาเป็นกลาง ไม่ปลุกปั่นอารมณ์', 'มีคำแนะนำตามหลักการแพทย์'],
      verdict: 'มีความน่าเชื่อถือสูง เป็นข่าวสารประชาสัมพันธ์ตามปกติ'
    },
    {
      text: 'ด่วนที่สุด!! พรุ่งนี้ห้ามขับรถออกจากบ้าน ตำรวจเตรียมตั้งด่านยึดรถคนไม่ใส่หน้ากากอนามัย',
      risk: 'high',
      flags: ['ขึ้นต้นด้วยคำว่า ด่วนที่สุด พร้อมเครื่องหมาย !!', 'สร้างความตื่นตระหนกไร้เหตุผล', 'ขัดต่อข้อกฎหมายจริง', 'ไม่มีเลขที่ประกาศหรือหนังสือราชการ'],
      verdict: 'ข่าวลือสร้างความหวาดกลัว ปั่นกระแสเพื่อยอดแชร์'
    }
  ];

  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = sampleHeadlines[selectedIdx];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-6">
      <h4 className="text-base font-semibold text-slate-900 mb-2 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-indigo-600" />
        ห้องปฏิบัติการสังเกตพาดหัวข่าว (News Inspector)
      </h4>
      <p className="text-xs text-slate-600 mb-3">
        เลือกพาดหัวข่าวตัวอย่างเพื่อวิเคราะห์สัญญาณเตือน (Red Flags) ก่อนกดแชร์
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {sampleHeadlines.map((h, i) => (
          <button
            key={i}
            onClick={() => setSelectedIdx(i)}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
              selectedIdx === i
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            ตัวอย่างที่ {i + 1}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-3.5 mb-3 text-sm text-slate-800 font-medium leading-relaxed">
        "{current.text}"
      </div>

      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-700">สัญญาณที่ตรวจพบ:</div>
        <ul className="space-y-1.5">
          {current.flags.map((flag, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
              {current.risk === 'high' ? (
                <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              )}
              <span>{flag}</span>
            </li>
          ))}
        </ul>

        <div className={`mt-3 p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
          current.risk === 'high' ? 'bg-rose-50 text-rose-800 border border-rose-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
        }`}>
          <span>สรุปการประเมิน: {current.verdict}</span>
        </div>
      </div>
    </div>
  );
};

// 3. Privacy Risk Audit Checklist
export const PrivacyAuditTool: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  const questions = [
    { id: 1, text: 'คุณเคยโพสต์รูปที่มองเห็นป้ายทะเบียนรถหรือตั๋วคอนเสิร์ต/ตั๋วเครื่องบินหรือไม่?' },
    { id: 2, text: 'โปรไฟล์โซเชียลมีเดียหลักของคุณตั้งค่าเป็น "สาธารณะ (Public)" ใช่หรือไม่?' },
    { id: 3, text: 'คุณเคยเช็กอินบอกตำแหน่งพิกัดแบบเรียลไทม์ขณะเดินทางท่องเที่ยวหรือไม่?' },
    { id: 4, text: 'คุณยอมรับคำขอเป็นเพื่อนจากคนแปลกหน้าที่ไม่เคยเจอตัวจริงหรือไม่?' }
  ];

  const toggle = (id: number) => {
    setAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const riskyCount = Object.values(answers).filter(Boolean).length;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-6">
      <h4 className="text-base font-semibold text-slate-900 mb-1 flex items-center gap-2">
        <Shield className="w-5 h-5 text-indigo-600" />
        เช็กลิสต์สำรวจความเสี่ยงข้อมูลส่วนตัว (Privacy Audit)
      </h4>
      <p className="text-xs text-slate-600 mb-4">
        เลือกข้อที่คุณเคยทำ เพื่อประเมินว่าคุณกำลังเปิดช่องโหว่ด้านข้อมูลส่วนตัวหรือไม่
      </p>

      <div className="space-y-2.5 mb-4">
        {questions.map((q) => {
          const checked = !!answers[q.id];
          return (
            <label
              key={q.id}
              onClick={() => toggle(q.id)}
              className={`flex items-start gap-3 p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                checked
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => {}}
                className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="leading-relaxed">{q.text}</span>
            </label>
          );
        })}
      </div>

      <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
        <span className="text-slate-600 font-medium">ผลการประเมิน:</span>
        <span className="font-semibold text-slate-900">
          {riskyCount === 0 && 'ยอดเยี่ยม! พฤติกรรมของคุณมีความปลอดภัยสูงมาก'}
          {riskyCount === 1 && 'มีความเสี่ยงเล็กน้อย แนะนำให้ปรับการตั้งค่าความเป็นส่วนตัว'}
          {riskyCount >= 2 && `มีความเสี่ยงสูงพบจุดเสี่ยง ${riskyCount} ข้อ ควรระมัดระวังเป็นพิเศษ`}
        </span>
      </div>
    </div>
  );
};

// 4. Constructive Tone Transformer
export const ToneConverterTool: React.FC = () => {
  const examples = [
    {
      rude: 'รายงานกลุ่มชิ้นนี้ทำมาได้แย่มาก โคตรกาก ใครทำส่วนนี้ไปทำมาใหม่เดี๋ยวนี้เลย!',
      constructive: 'ขอบคุณทุกคนที่ช่วยกันทำนะ ในส่วนนี้น่าจะเสริมข้อมูลสถิติและจัดระเบียบหัวข้อเพิ่มอีกนิด จะช่วยให้รายงานสมบูรณ์ขึ้นมากเลย เดี๋ยวเราช่วยตรวจดูอีกรอบนะ',
      benefit: 'รักษาความสัมพันธ์ในทีม ไม่สร้างความขัดแย้ง และกระตุ้นให้เพื่อนอยากปรับปรุงงานจริง'
    },
    {
      rude: 'วาดรูปอะไรเนี่ย ทุเรศตามาก หัดไปเรียนพื้นฐานศิลปะมาก่อนเหอะ ค่อยเอามาลง',
      constructive: 'ชื่นชอบโทนสีที่เลือกใช้นะ หากลองฝึกเรื่องสัดส่วนและแสงเงาเพิ่มเติมในผลงานถัดไป ลายเส้นจะโดดเด่นขึ้นแน่นอน เป็นกำลังใจให้พัฒนาต่อไปครับ',
      benefit: 'วิจารณ์เชิงสร้างสรรค์ (Constructive Criticism) ให้ข้อเสนอแนะที่เป็นรูปธรรม'
    }
  ];

  const [idx, setIdx] = useState(0);
  const cur = examples[idx];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          ฝึกเปลี่ยนข้อความให้สุภาพและสร้างสรรค์ (Tone Transformer)
        </h4>
        <button
          onClick={() => setIdx((idx + 1) % examples.length)}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          เปลี่ยนตัวอย่าง
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-3.5">
          <div className="text-xs font-semibold text-rose-800 mb-1 flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5" />
            ข้อความแบบใช้อารมณ์ (ทำร้ายความรู้สึก):
          </div>
          <p className="text-xs text-rose-950 italic leading-relaxed">
            "{cur.rude}"
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5">
          <div className="text-xs font-semibold text-emerald-800 mb-1 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            ปรับเป็นข้อความที่สร้างสรรค์ (ได้ผลและน่าฟัง):
          </div>
          <p className="text-xs text-emerald-950 leading-relaxed font-medium">
            "{cur.constructive}"
          </p>
        </div>
      </div>

      <div className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
        <span className="font-semibold text-slate-800">ทำไมวิธีนี้จึงดีกว่า: </span>
        {cur.benefit}
      </div>
    </div>
  );
};
