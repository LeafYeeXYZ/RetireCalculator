import './App.css'
import { calculator, type RetirementResult } from './lib/calculator'
import { Radio, DatePicker, Button } from 'antd'
import { useState } from 'react'

function App() {

  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [role, setRole] = useState<'worker' | 'cadre'>('worker')
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [result, setResult] = useState<RetirementResult | null>(null)

  return (
    <div className="flex items-center justify-center flex-col w-dvw h-dvh bg-white text-gray-700">
      <p className="mb-6 text-xl font-bold">
        延迟退休计算器
      </p>

      {/* 性别选择 */}
      <div className="mb-4 flex flex-row items-center justify-center">
        <label className="font-bold text-sm mr-2">性别</label>
        <Radio.Group
          onChange={(e) => setGender(e.target.value)}
          value={gender}
          optionType='button'
          buttonStyle='solid'
        >
          <Radio value="male">男</Radio>
          <Radio value="female">女</Radio>
        </Radio.Group>
      </div>

      {/* 岗位选择，仅对女性可见 */}
      {gender === 'female' && (
        <div className="mb-4 flex flex-row items-center justify-center">
          <label className="font-bold text-sm mr-2">岗位</label>
          <Radio.Group
            onChange={(e) => setRole(e.target.value)}
            value={role}
            optionType='button'
            buttonStyle='solid'
          >
            <Radio value="worker">女工人</Radio>
            <Radio value="cadre">女干部</Radio>
          </Radio.Group>
        </div>
      )}

      {/* 出生日期选择 */}
      <div className="mb-4 flex flex-row items-center justify-center">
        <label className="font-bold text-sm mr-2 text-nowrap">出生日期</label>
        <DatePicker
          onChange={(date) => setBirthDate(date?.toDate() || new Date())}
          className="w-full"
        />
      </div>

      {/* 计算按钮 */}
      <div className="mt-2">
        <Button
          type="primary"
          disabled={!birthDate}
          onClick={() => {
            const retirementResult = calculator({
              gender,
              role,
              birthDate: birthDate as Date,
            })
            setResult(retirementResult)
          }}
        >
          计算
        </Button>
      </div>

      {/* 结果显示 */}
      {result && (
        <div className="mt-6 text-center">
          <p className='font-bold mb-1'>
            你将要延迟退休{result.delayYears}年{result.delayMonths > 0 ? result.delayMonths + '个月' : ''}
          </p>
          <p className='font-bold mb-1'>
            退休时你已经{result.retirementAgeYear}岁{result.retirementAgeMonth > 0 ? result.retirementAgeMonth + '个月' : ''}
          </p>
          <p className='font-bold mb-1'>
            你最终将在{result.retirementYear}年{result.retirementMonth}月退休
          </p>
        </div>
      )}
    </div>
  )
}

export default App
