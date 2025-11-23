import React, { useState, useEffect } from 'react';

import { MapPin, User, Lock, CheckCircle, XCircle, Loader2, Navigation } from 'lucide-react';



// MVP용 화면 컴포넌트들

export default function App() {

  const [screen, setScreen] = useState('login'); // login, signup, home, matching, matched

  const [userInfo, setUserInfo] = useState({ role: '', revealIdentity: false });

  const [destination, setDestination] = useState('');



  // 화면 전환 함수

  const goHome = () => setScreen('home');

  const goSignup = () => setScreen('signup');

  const goLogin = () => setScreen('login');

  

  // 1. 로그인 화면

  if (screen === 'login') {

    return (

      <div className="flex flex-col items-center justify-center h-screen bg-white p-6">

        <div className="w-full max-w-md">

          <div className="mb-10 text-center">

            {/* 이화여자대학교 로고 대체 텍스트 / 이미지 */}

            <div className="mx-auto w-24 h-24 bg-ewha rounded-full flex items-center justify-center mb-4">

              <span className="text-white text-3xl font-bold">EWHA</span>

            </div>

            <h1 className="text-3xl font-bold text-ewha">EWAY SHARE</h1>

            <p className="text-gray-500">이화인을 위한 안심 택시 쉐어링</p>

          </div>

          

          <div className="space-y-4">

            <div>

              <label className="block text-sm font-medium text-gray-700">아이디</label>

              <input type="text" className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 outline-none" placeholder="이화인 아이디" />

            </div>

            <div>

              <label className="block text-sm font-medium text-gray-700">비밀번호</label>

              <input type="password" className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 outline-none" placeholder="비밀번호" />

            </div>

            <button 

              onClick={goHome}

              className="w-full bg-ewha text-white p-4 rounded-lg font-bold text-lg hover:bg-green-900 transition"

            >

              로그인

            </button>

            <div className="text-center mt-4">

              <button onClick={goSignup} className="text-gray-500 underline text-sm">

                아직 회원이 아니신가요? 회원가입

              </button>

            </div>

          </div>

        </div>

      </div>

    );

  }



  // 2. 회원가입 화면

  if (screen === 'signup') {

    return (

      <div className="flex flex-col h-screen bg-white p-6">

        <div className="w-full max-w-md mx-auto">

          <h2 className="text-2xl font-bold text-ewha mb-6">회원가입</h2>

          

          <div className="space-y-5">

            <div>

              <label className="block text-sm font-bold text-gray-700 mb-2">신분 선택 (필수)</label>

              <div className="grid grid-cols-2 gap-2">

                {['대학생', '대학원생', '교수', '교직원', '졸업생'].map((role) => (

                  <label key={role} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">

                    <input 

                      type="radio" 

                      name="role" 

                      className="mr-2 text-green-800 focus:ring-green-800" 

                      onChange={() => setUserInfo({...userInfo, role})}

                    />

                    <span className="text-sm">{role}</span>

                  </label>

                ))}

              </div>

            </div>



            <div>

              <label className="block text-sm font-medium text-gray-700">이메일 (학교 인증)</label>

              <div className="flex gap-2 mt-1">

                <input type="email" className="flex-1 p-3 border rounded-lg" placeholder="ewhain@ewha.ac.kr" />

                <button className="bg-gray-200 px-4 rounded-lg text-sm font-bold">인증</button>

              </div>

            </div>



            <div>

              <label className="block text-sm font-medium text-gray-700">비밀번호</label>

              <input type="password" className="w-full mt-1 p-3 border rounded-lg" placeholder="비밀번호 입력" />

            </div>

            <div>

              <label className="block text-sm font-medium text-gray-700">비밀번호 확인</label>

              <input type="password" className="w-full mt-1 p-3 border rounded-lg" placeholder="비밀번호 재입력" />

            </div>



            <button 

              onClick={goLogin}

              className="w-full bg-ewha text-white p-4 rounded-lg font-bold mt-6"

            >

              가입완료

            </button>

          </div>

        </div>

      </div>

    );

  }



  // 3. 택시 부르기 (메인) 화면

  if (screen === 'home') {

    return (

      <div className="flex flex-col h-screen bg-gray-50">

        {/* 상단 GPS 헤더 */}

        <div className="bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">

          <div className="flex items-center text-ewha font-bold">

            <Navigation className="w-5 h-5 mr-2 fill-current" />

            <span>현위치: 서대문구 이화여대길</span>

          </div>

          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">

            <User className="w-5 h-5 text-gray-600" />

          </div>

        </div>



        <div className="flex-1 p-6 flex flex-col justify-end pb-10">

          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">

            {/* 출발지 (락 걸림) */}

            <div className="flex items-center">

              <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>

              <div className="flex-1">

                <p className="text-xs text-gray-500 mb-1">출발장소 (지정됨)</p>

                <input 

                  type="text" 

                  value="이화여자대학교 정문 승강장" 

                  disabled 

                  className="w-full font-bold text-gray-800 bg-gray-100 p-2 rounded border border-gray-200"

                />

              </div>

            </div>



            {/* 도착지 */}

            <div className="flex items-center">

              <div className="w-3 h-3 bg-red-500 rounded-full mr-4"></div>

              <div className="flex-1">

                <p className="text-xs text-gray-500 mb-1">도착장소</p>

                <input 

                  type="text" 

                  placeholder="주소 검색 또는 지도 터치" 

                  className="w-full font-bold text-gray-800 p-2 border-b border-gray-300 focus:border-ewha outline-none"

                  onChange={(e) => setDestination(e.target.value)}

                />

              </div>

            </div>



            {/* 옵션 체크박스 */}

            <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">

              <input 

                type="checkbox" 

                id="identity" 

                className="w-5 h-5 text-green-800 rounded focus:ring-green-800"

                checked={userInfo.revealIdentity}

                onChange={(e) => setUserInfo({...userInfo, revealIdentity: e.target.checked})}

              />

              <label htmlFor="identity" className="ml-3 text-sm font-medium text-gray-700">

                내 신분 노출하기 <span className="text-xs text-gray-400">(체크 시 상대방에게 소속 공개)</span>

              </label>

            </div>



            {/* 호출 버튼 */}

            <button 

              onClick={() => setScreen('matching')}

              disabled={!destination}

              className={`w-full p-4 rounded-xl font-bold text-lg text-white shadow-md transition

                ${destination ? 'bg-ewha hover:bg-green-900' : 'bg-gray-300 cursor-not-allowed'}`}

            >

              동승자 매칭 시작하기

            </button>

          </div>

        </div>

      </div>

    );

  }



  // 4. 매칭 중 / 매칭 완료 화면 컴포넌트

  return <MatchingScreen onCancel={() => setScreen('home')} myInfo={userInfo} />;

}



// 매칭 로직 분리

function MatchingScreen({ onCancel, myInfo }) {

  const [status, setStatus] = useState('searching'); // searching, found



  useEffect(() => {

    // 3초 뒤에 가짜 매칭 성공 처리

    const timer = setTimeout(() => {

      setStatus('found');

    }, 3000);

    return () => clearTimeout(timer);

  }, []);



  if (status === 'searching') {

    return (

      <div className="flex flex-col items-center justify-center h-screen bg-ewha relative overflow-hidden">

        <div className="absolute inset-0 bg-black opacity-10"></div>

        <div className="z-10 flex flex-col items-center">

          <div className="relative">

            <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-ping"></div>

            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl">

              <Loader2 className="w-10 h-10 text-ewha animate-spin" />

            </div>

          </div>

          <h2 className="text-white text-2xl font-bold mt-8">동승자를 찾고 있어요...</h2>

          <p className="text-green-200 mt-2">이화여대 정문 근처 검색 중</p>

          

          <button onClick={onCancel} className="mt-12 px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/30 transition">

            호출 취소

          </button>

        </div>

      </div>

    );

  }



  // 5. 매칭 완료 (가짜 교수님 데이터)

  return (

    <div className="flex flex-col h-screen bg-gray-100">

      <div className="bg-ewha h-1/3 flex flex-col items-center justify-center rounded-b-3xl shadow-lg relative z-0">

        <CheckCircle className="w-16 h-16 text-white mb-2" />

        <h2 className="text-2xl font-bold text-white">매칭 성공!</h2>

        <p className="text-green-100">동승자가 확인되었습니다.</p>

      </div>



      <div className="px-6 -mt-10 relative z-10">

        <div className="bg-white rounded-2xl shadow-xl p-6">

          <div className="flex items-center border-b pb-4 mb-4">

            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden border-2 border-ewha">

               {/* 실제 앱에선 이미지 URL */}

               <User className="w-full h-full p-2 text-gray-500" />

            </div>

            <div className="ml-4">

              <div className="flex items-center gap-2">

                <h3 className="text-xl font-bold text-gray-800">김이화</h3>

                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">

                  교수

                </span>

              </div>

              <p className="text-gray-500 text-sm">심리학과 / 신뢰점수 4.9★</p>

            </div>

          </div>



          <div className="space-y-3">

            <div className="flex justify-between text-sm">

              <span className="text-gray-500">도착지</span>

              <span className="font-bold text-gray-800">이대역 3번 출구</span>

            </div>

            <div className="flex justify-between text-sm">

              <span className="text-gray-500">예상 요금 (1/N)</span>

              <span className="font-bold text-ewha">약 2,400원</span>

            </div>

          </div>



          <div className="mt-6 flex gap-3">

            <button 

              onClick={onCancel}

              className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300"

            >

              취소

            </button>

            <button 

              onClick={() => alert('택시가 호출되었습니다! (데모 종료)')}

              className="flex-1 py-4 bg-ewha text-white rounded-xl font-bold hover:bg-green-900"

            >

              확인 (합승)

            </button>

          </div>

        </div>

        

        {/* 내 노출 정보 확인용 (디버깅) */}

        {myInfo.revealIdentity && (

          <div className="mt-4 text-center">

            <p className="text-xs text-gray-400">

              * 상대방에게 나의 신분({myInfo.role || '미지정'})이 공개되었습니다.

            </p>

          </div>

        )}

      </div>

    </div>

  );

}

