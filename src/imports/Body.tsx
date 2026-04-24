import svgPaths from "./svg-prcg06vdff";

function Container2() {
  return (
    <div className="bg-white relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[14px] text-black">W</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[28px] relative shrink-0 w-[83.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[28px] left-0 text-[18px] text-white top-[-1px]">WasteLess</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Text />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[81px] relative shrink-0 w-[256px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#364153] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[24px] px-[24px] relative size-full">
        <Container1 />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1fc96a00} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p33089d00} id="Vector_2" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p49cfa80} id="Vector_3" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1cfbf300} id="Vector_4" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[77.109px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[39.5px] text-[#d1d5dc] text-[16px] text-center top-[-2px]">Dashboard</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[16px] relative size-full">
          <Icon />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p166b7100} id="Vector_2" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[60.578px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[30px] text-[#d1d5dc] text-[16px] text-center top-[-2px]">Usuarios</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[16px] relative size-full">
          <Icon1 />
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p25fc4100} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[37.516px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[19.5px] text-[#d1d5dc] text-[16px] text-center top-[-2px]">Roles</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[16px] relative size-full">
          <Icon2 />
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p20f4ecf0} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 18.3333V10" id="Vector_2" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2eca8c80} id="Vector_3" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.25 3.55833L13.75 7.85" id="Vector_4" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[55.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[28px] text-[#d1d5dc] text-[16px] text-center top-[-2px]">Pedidos</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[16px] relative size-full">
          <Icon3 />
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M8.33333 10H11.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 6.66667H11.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p16bb4600} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3b103700} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p24196980} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[66.938px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[33.5px] text-[16px] text-center text-white top-[-2px]">Empresas</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#e7000b] h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[16px] relative size-full">
          <Icon4 />
          <Text5 />
        </div>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p232b1d80} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3abdf300} id="Vector_2" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 7.5H6.66667" id="Vector_3" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 10.8333H6.66667" id="Vector_4" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 14.1667H6.66667" id="Vector_5" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[80.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[40px] text-[#d1d5dc] text-[16px] text-center top-[-2px]">Facturación</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[16px] relative size-full">
          <Icon5 />
          <Text6 />
        </div>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p24177880} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3427e900} id="Vector_2" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p11bd83d8} id="Vector_3" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p4a905a0} id="Vector_4" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M14.0433 14.81L13.7242 15.58" id="Vector_5" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1efefb60} id="Vector_6" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M16.275 15.58L15.9567 14.81" id="Vector_7" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.31 11.5433L18.08 11.2242" id="Vector_8" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.31 13.4567L18.08 13.7758" id="Vector_9" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p31b7b00} id="Vector_10" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} id="Vector_11" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[24px] relative shrink-0 w-[77.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[39.5px] text-[#d1d5dc] text-[16px] text-center top-[-2px]">Empleados</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[16px] relative size-full">
          <Icon6 />
          <Text7 />
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[256px]" data-name="Navigation">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pt-[16px] px-[16px] relative size-full">
        <Button />
        <Button1 />
        <Button2 />
        <Button3 />
        <Button4 />
        <Button5 />
        <Button6 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M2.5 4.16667H2.50833" id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 10H2.50833" id="Vector_2" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 15.8333H2.50833" id="Vector_3" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 4.16667H17.5" id="Vector_4" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 10H17.5" id="Vector_5" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 15.8333H17.5" id="Vector_6" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[24px] relative shrink-0 w-[33.234px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[17px] text-[#d1d5dc] text-[16px] text-center top-[-2px]">Lada</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[16px] relative size-full">
          <Icon7 />
          <Text8 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[81px] relative shrink-0 w-[256px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#364153] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[17px] px-[16px] relative size-full">
        <Button7 />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-[#2c2c2c] h-[909px] relative shrink-0 w-[288px]" data-name="Sidebar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container />
        <Navigation />
        <Container3 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Heading 1">
      <p className="flex-[1_0_0] font-['Arimo:Bold',sans-serif] font-bold leading-[32px] min-h-px min-w-px relative text-[#1e2939] text-[24px] whitespace-pre-wrap">Gestión de Empresas</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#4a5565] text-[14px]">Administración de empresas clientes y restaurantes</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[56px] relative shrink-0 w-[315.359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 4.16667V15.8333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[63px] text-[16px] text-center text-white top-[-2px]">Registrar Empresa</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#4f39f6] h-[40px] relative rounded-[10px] shrink-0 w-[186.766px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] relative size-full">
        <Icon8 />
        <Text9 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[56px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Button8 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#4a5565] text-[14px]">Total Empresas</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Bold',sans-serif] font-bold leading-[32px] min-h-px min-w-px relative text-[#1e2939] text-[24px] whitespace-pre-wrap">6</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[52px] relative shrink-0 w-[91.828px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M13.3333 16H18.6667" id="Vector" stroke="var(--stroke-0, #615FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M13.3333 10.6667H18.6667" id="Vector_2" stroke="var(--stroke-0, #615FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1188a00} id="Vector_3" stroke="var(--stroke-0, #615FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1f30e980} id="Vector_4" stroke="var(--stroke-0, #615FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p343cd80} id="Vector_5" stroke="var(--stroke-0, #615FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[52px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Icon9 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#615fff] border-l-4 border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col items-start pl-[20px] pr-[16px] pt-[16px] relative size-full">
        <Container9 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#4a5565] text-[14px]">Empresas Cliente</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Bold',sans-serif] font-bold leading-[32px] min-h-px min-w-px relative text-[#1e2939] text-[24px] whitespace-pre-wrap">3</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[52px] relative shrink-0 w-[105.172px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph3 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M13.3333 16H18.6667" id="Vector" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M13.3333 10.6667H18.6667" id="Vector_2" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1188a00} id="Vector_3" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1f30e980} id="Vector_4" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p343cd80} id="Vector_5" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex h-[52px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Icon10 />
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2b7fff] border-l-4 border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col items-start pl-[20px] pr-[16px] pt-[16px] relative size-full">
        <Container12 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#4a5565] text-[14px]">Restaurantes</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Bold',sans-serif] font-bold leading-[32px] min-h-px min-w-px relative text-[#1e2939] text-[24px] whitespace-pre-wrap">3</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[52px] relative shrink-0 w-[78.938px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph5 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M13.3333 16H18.6667" id="Vector" stroke="var(--stroke-0, #FF6900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M13.3333 10.6667H18.6667" id="Vector_2" stroke="var(--stroke-0, #FF6900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1188a00} id="Vector_3" stroke="var(--stroke-0, #FF6900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1f30e980} id="Vector_4" stroke="var(--stroke-0, #FF6900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p343cd80} id="Vector_5" stroke="var(--stroke-0, #FF6900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex h-[52px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Icon11 />
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-white col-3 justify-self-stretch relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#ff6900] border-l-4 border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col items-start pl-[20px] pr-[16px] pt-[16px] relative size-full">
        <Container15 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#4a5565] text-[14px]">Empresas Activas</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Bold',sans-serif] font-bold leading-[32px] min-h-px min-w-px relative text-[#1e2939] text-[24px] whitespace-pre-wrap">5</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[52px] relative shrink-0 w-[105.813px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph7 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M13.3333 16H18.6667" id="Vector" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M13.3333 10.6667H18.6667" id="Vector_2" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1188a00} id="Vector_3" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1f30e980} id="Vector_4" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p343cd80} id="Vector_5" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex h-[52px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Icon12 />
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-white col-4 justify-self-stretch relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#00c950] border-l-4 border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col items-start pl-[20px] pr-[16px] pt-[16px] relative size-full">
        <Container18 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[84px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container11 />
      <Container14 />
      <Container17 />
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#4f39f6] h-[36px] relative rounded-[10px] shrink-0 w-[89.5px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[45px] text-[14px] text-center text-white top-[6px] w-[58px] whitespace-pre-wrap">Todas (6)</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#f3f4f6] h-[36px] relative rounded-[10px] shrink-0 w-[103.016px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[52px] text-[#364153] text-[14px] text-center top-[6px] w-[72px] whitespace-pre-wrap">Clientes (3)</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[10px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[67.5px] text-[#364153] text-[14px] text-center top-[6px] w-[103px] whitespace-pre-wrap">Restaurantes (3)</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[36px] items-start left-[827.08px] top-[3px] w-[342.922px]" data-name="Container">
      <Button9 />
      <Button10 />
      <Button11 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute h-[42px] left-0 rounded-[10px] top-0 w-[811.078px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[40px] pr-[16px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-[rgba(10,10,10,0.5)]">Buscar por nombre, NIT o ciudad...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute left-[12px] size-[20px] top-[11px]" data-name="Icon">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M17.5 17.5L13.8833 13.8833" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pcddfd00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute h-[42px] left-0 top-0 w-[811.078px]" data-name="Container">
      <TextInput />
      <Icon13 />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-white h-[74px] relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pt-[16px] px-[16px] relative size-full">
        <Container21 />
      </div>
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute content-stretch flex h-[44.5px] items-start left-0 px-[24px] py-[12px] top-0 w-[330.188px]" data-name="Header Cell">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#364153] text-[14px] whitespace-pre-wrap">Nombre</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute content-stretch flex h-[44.5px] items-start left-[330.19px] px-[24px] py-[12px] top-0 w-[163.797px]" data-name="Header Cell">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#364153] text-[14px] whitespace-pre-wrap">Tipo</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute content-stretch flex h-[44.5px] items-start left-[493.98px] px-[24px] py-[12px] top-0 w-[141.5px]" data-name="Header Cell">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#364153] text-[14px] whitespace-pre-wrap">NIT</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute content-stretch flex h-[44.5px] items-start left-[635.48px] px-[24px] py-[12px] top-0 w-[106.344px]" data-name="Header Cell">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#364153] text-[14px] whitespace-pre-wrap">Ciudad</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute content-stretch flex h-[44.5px] items-start left-[741.83px] px-[24px] py-[12px] top-0 w-[156.438px]" data-name="Header Cell">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#364153] text-[14px] whitespace-pre-wrap">Contacto</p>
    </div>
  );
}

function HeaderCell5() {
  return (
    <div className="absolute content-stretch flex h-[44.5px] items-start left-[898.27px] px-[24px] py-[12px] top-0 w-[119.391px]" data-name="Header Cell">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#364153] text-[14px] whitespace-pre-wrap">Estado</p>
    </div>
  );
}

function HeaderCell6() {
  return (
    <div className="absolute content-stretch flex h-[44.5px] items-start left-[1017.66px] px-[24px] py-[12px] top-0 w-[184.344px]" data-name="Header Cell">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#364153] text-[14px] whitespace-pre-wrap">Acciones</p>
    </div>
  );
}

function TableRow() {
  return (
    <div className="absolute h-[44.5px] left-0 top-0 w-[1202px]" data-name="Table Row">
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
      <HeaderCell5 />
      <HeaderCell6 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#e5e7eb] border-b border-solid h-[44.5px] left-0 top-0 w-[1202px]" data-name="Table Header">
      <TableRow />
    </div>
  );
}

function Icon14() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[41.67%] right-[41.67%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.66667">
            <path d="M0.833333 0.833333H4.16667" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.33%_41.67%_66.67%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.66667">
            <path d="M0.833333 0.833333H4.16667" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_41.67%_12.5%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-20%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5.83333">
            <path d={svgPaths.p3a335380} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_8.33%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 13.3333">
            <path d={svgPaths.p294f4f00} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-1/4 right-1/4 top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 16.6667">
            <path d={svgPaths.p2e423a00} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon14 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[87.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1e2939] text-[14px]">Ecopetrol S.A.</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[36px] items-center left-[24px] top-[16.5px] w-[282.188px]" data-name="Container">
      <Container26 />
      <Text10 />
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute h-[69px] left-0 top-0 w-[330.188px]" data-name="Table Cell">
      <Container25 />
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute bg-[#dbeafe] content-stretch flex h-[24px] items-center left-[24px] px-[12px] py-[4px] rounded-[33554400px] top-[23px] w-[81.516px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#1447e6] text-[12px] whitespace-pre-wrap">👥 Cliente</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute h-[69px] left-[330.19px] top-0 w-[163.797px]" data-name="Table Cell">
      <Text11 />
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute h-[69px] left-[493.98px] top-0 w-[141.5px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[24px] text-[#1e2939] text-[14px] top-[22.5px]">899.999.068-1</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute h-[69px] left-[635.48px] top-0 w-[106.344px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[24px] text-[#1e2939] text-[14px] top-[22.5px]">Bogotá</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1e2939] text-[14px]">María Rodríguez</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px] whitespace-pre-wrap">+57 310 123 4567</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[24px] top-[16.5px] w-[108.438px]" data-name="Container">
      <Paragraph9 />
      <Paragraph10 />
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute h-[69px] left-[741.83px] top-0 w-[156.438px]" data-name="Table Cell">
      <Container27 />
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute bg-[#dcfce7] content-stretch flex h-[24px] items-center left-[24px] px-[12px] py-[4px] rounded-[33554400px] top-[23px] w-[57.328px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#008236] text-[12px]">Activa</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute h-[69px] left-[898.27px] top-0 w-[119.391px]" data-name="Table Cell">
      <Text12 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5008 11.9991">
            <path d={svgPaths.p2be95100} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p93ea200} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pt-[8px] px-[8px] rounded-[10px] size-[34px] top-0" data-name="Button">
      <Icon15 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_8.34%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4999 16.4997">
            <path d={svgPaths.p1d9f8700} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_20.83%_62.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 4.5">
            <path d="M0.75 0.75L3.75 3.75" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[42px] pt-[8px] px-[8px] rounded-[10px] size-[34px] top-0" data-name="Button">
      <Icon16 />
    </div>
  );
}

function Text13() {
  return <div className="bg-white rounded-[33554400px] shrink-0 size-[16px]" data-name="Text" />;
}

function Button14() {
  return (
    <div className="absolute bg-[#00c950] content-stretch flex h-[24px] items-center left-[84px] pl-[24px] rounded-[33554400px] top-[5px] w-[44px]" data-name="Button">
      <Text13 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute h-[34px] left-[24px] top-[17.5px] w-[136.344px]" data-name="Container">
      <Button12 />
      <Button13 />
      <Button14 />
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute h-[69px] left-[1017.66px] top-0 w-[184.344px]" data-name="Table Cell">
      <Container28 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute border-[#e5e7eb] border-b border-solid h-[69px] left-0 top-0 w-[1202px]" data-name="Table Row">
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
      <TableCell6 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[41.67%] right-[41.67%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.66667">
            <path d="M0.833333 0.833333H4.16667" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.33%_41.67%_66.67%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.66667">
            <path d="M0.833333 0.833333H4.16667" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_41.67%_12.5%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-20%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5.83333">
            <path d={svgPaths.p3a335380} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_8.33%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 13.3333">
            <path d={svgPaths.p294f4f00} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-1/4 right-1/4 top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 16.6667">
            <path d={svgPaths.p2e423a00} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-[#ffedd4] relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon17 />
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[167.016px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1e2939] text-[14px]">Restaurante El Buen Sabor</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[36px] items-center left-[24px] top-[16.5px] w-[282.188px]" data-name="Container">
      <Container30 />
      <Text14 />
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute h-[69px] left-0 top-0 w-[330.188px]" data-name="Table Cell">
      <Container29 />
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute bg-[#ffedd4] content-stretch flex h-[24px] items-center left-[24px] px-[12px] py-[4px] rounded-[33554400px] top-[23px] w-[108.438px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#ca3500] text-[12px]">🍽️ Restaurante</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute h-[69px] left-[330.19px] top-0 w-[163.797px]" data-name="Table Cell">
      <Text15 />
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute h-[69px] left-[493.98px] top-0 w-[141.5px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[24px] text-[#1e2939] text-[14px] top-[22.5px]">900.123.456-7</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute h-[69px] left-[635.48px] top-0 w-[106.344px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[24px] text-[#1e2939] text-[14px] top-[22.5px]">Bogotá</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#1e2939] text-[14px] whitespace-pre-wrap">Carlos Méndez</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px] whitespace-pre-wrap">+57 320 654 9876</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[24px] top-[16.5px] w-[108.438px]" data-name="Container">
      <Paragraph11 />
      <Paragraph12 />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute h-[69px] left-[741.83px] top-0 w-[156.438px]" data-name="Table Cell">
      <Container31 />
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute bg-[#dcfce7] content-stretch flex h-[24px] items-center left-[24px] px-[12px] py-[4px] rounded-[33554400px] top-[23px] w-[57.328px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#008236] text-[12px]">Activa</p>
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute h-[69px] left-[898.27px] top-0 w-[119.391px]" data-name="Table Cell">
      <Text16 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5008 11.9991">
            <path d={svgPaths.p2be95100} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p93ea200} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pt-[8px] px-[8px] rounded-[10px] size-[34px] top-0" data-name="Button">
      <Icon18 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_8.34%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4999 16.4997">
            <path d={svgPaths.p1d9f8700} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_20.83%_62.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 4.5">
            <path d="M0.75 0.75L3.75 3.75" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[42px] pt-[8px] px-[8px] rounded-[10px] size-[34px] top-0" data-name="Button">
      <Icon19 />
    </div>
  );
}

function Text17() {
  return <div className="bg-white rounded-[33554400px] shrink-0 size-[16px]" data-name="Text" />;
}

function Button17() {
  return (
    <div className="absolute bg-[#00c950] content-stretch flex h-[24px] items-center left-[84px] pl-[24px] rounded-[33554400px] top-[5px] w-[44px]" data-name="Button">
      <Text17 />
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute h-[34px] left-[24px] top-[17.5px] w-[136.344px]" data-name="Container">
      <Button15 />
      <Button16 />
      <Button17 />
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute h-[69px] left-[1017.66px] top-0 w-[184.344px]" data-name="Table Cell">
      <Container32 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute border-[#e5e7eb] border-b border-solid h-[69px] left-0 top-[69px] w-[1202px]" data-name="Table Row">
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
      <TableCell12 />
      <TableCell13 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[41.67%] right-[41.67%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.66667">
            <path d="M0.833333 0.833333H4.16667" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.33%_41.67%_66.67%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.66667">
            <path d="M0.833333 0.833333H4.16667" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_41.67%_12.5%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-20%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5.83333">
            <path d={svgPaths.p3a335380} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_8.33%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 13.3333">
            <path d={svgPaths.p294f4f00} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-1/4 right-1/4 top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 16.6667">
            <path d={svgPaths.p2e423a00} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon20 />
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[20px] relative shrink-0 w-[219.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1e2939] text-[14px]">Universidad Nacional de Colombia</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[36px] items-center left-[24px] top-[16.5px] w-[282.188px]" data-name="Container">
      <Container34 />
      <Text18 />
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute h-[69px] left-0 top-0 w-[330.188px]" data-name="Table Cell">
      <Container33 />
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute bg-[#dbeafe] content-stretch flex h-[24px] items-center left-[24px] px-[12px] py-[4px] rounded-[33554400px] top-[23px] w-[81.516px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#1447e6] text-[12px] whitespace-pre-wrap">👥 Cliente</p>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute h-[69px] left-[330.19px] top-0 w-[163.797px]" data-name="Table Cell">
      <Text19 />
    </div>
  );
}

function TableCell16() {
  return (
    <div className="absolute h-[69px] left-[493.98px] top-0 w-[141.5px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[24px] text-[#1e2939] text-[14px] top-[22.5px]">899.999.063-3</p>
    </div>
  );
}

function TableCell17() {
  return (
    <div className="absolute h-[69px] left-[635.48px] top-0 w-[106.344px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[24px] text-[#1e2939] text-[14px] top-[22.5px]">Bogotá</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#1e2939] text-[14px] whitespace-pre-wrap">Ana López</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px] whitespace-pre-wrap">+57 315 789 0123</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[24px] top-[16.5px] w-[108.438px]" data-name="Container">
      <Paragraph13 />
      <Paragraph14 />
    </div>
  );
}

function TableCell18() {
  return (
    <div className="absolute h-[69px] left-[741.83px] top-0 w-[156.438px]" data-name="Table Cell">
      <Container35 />
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute bg-[#dcfce7] content-stretch flex h-[24px] items-center left-[24px] px-[12px] py-[4px] rounded-[33554400px] top-[23px] w-[57.328px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#008236] text-[12px]">Activa</p>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="absolute h-[69px] left-[898.27px] top-0 w-[119.391px]" data-name="Table Cell">
      <Text20 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5008 11.9991">
            <path d={svgPaths.p2be95100} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p93ea200} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pt-[8px] px-[8px] rounded-[10px] size-[34px] top-0" data-name="Button">
      <Icon21 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_8.34%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4999 16.4997">
            <path d={svgPaths.p1d9f8700} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_20.83%_62.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 4.5">
            <path d="M0.75 0.75L3.75 3.75" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button19() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[42px] pt-[8px] px-[8px] rounded-[10px] size-[34px] top-0" data-name="Button">
      <Icon22 />
    </div>
  );
}

function Text21() {
  return <div className="bg-white rounded-[33554400px] shrink-0 size-[16px]" data-name="Text" />;
}

function Button20() {
  return (
    <div className="absolute bg-[#00c950] content-stretch flex h-[24px] items-center left-[84px] pl-[24px] rounded-[33554400px] top-[5px] w-[44px]" data-name="Button">
      <Text21 />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute h-[34px] left-[24px] top-[17.5px] w-[136.344px]" data-name="Container">
      <Button18 />
      <Button19 />
      <Button20 />
    </div>
  );
}

function TableCell20() {
  return (
    <div className="absolute h-[69px] left-[1017.66px] top-0 w-[184.344px]" data-name="Table Cell">
      <Container36 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute border-[#e5e7eb] border-b border-solid h-[69px] left-0 top-[138px] w-[1202px]" data-name="Table Row">
      <TableCell14 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
      <TableCell20 />
    </div>
  );
}

function Icon23() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[41.67%] right-[41.67%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.66667">
            <path d="M0.833333 0.833333H4.16667" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.33%_41.67%_66.67%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.66667">
            <path d="M0.833333 0.833333H4.16667" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_41.67%_12.5%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-20%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5.83333">
            <path d={svgPaths.p3a335380} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_8.33%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 13.3333">
            <path d={svgPaths.p294f4f00} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-1/4 right-1/4 top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 16.6667">
            <path d={svgPaths.p2e423a00} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="bg-[#ffedd4] relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[20px] relative shrink-0 w-[140.859px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1e2939] text-[14px]">Comedor Social Norte</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[36px] items-center left-[24px] top-[16.5px] w-[282.188px]" data-name="Container">
      <Container38 />
      <Text22 />
    </div>
  );
}

function TableCell21() {
  return (
    <div className="absolute h-[69px] left-0 top-0 w-[330.188px]" data-name="Table Cell">
      <Container37 />
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute bg-[#ffedd4] content-stretch flex h-[24px] items-center left-[24px] px-[12px] py-[4px] rounded-[33554400px] top-[23px] w-[108.438px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#ca3500] text-[12px]">🍽️ Restaurante</p>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="absolute h-[69px] left-[330.19px] top-0 w-[163.797px]" data-name="Table Cell">
      <Text23 />
    </div>
  );
}

function TableCell23() {
  return (
    <div className="absolute h-[69px] left-[493.98px] top-0 w-[141.5px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[24px] text-[#1e2939] text-[14px] top-[22.5px]">900.234.567-8</p>
    </div>
  );
}

function TableCell24() {
  return (
    <div className="absolute h-[69px] left-[635.48px] top-0 w-[106.344px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[24px] text-[#1e2939] text-[14px] top-[22.5px]">Bogotá</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#1e2939] text-[14px] whitespace-pre-wrap">Jorge Pérez</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px] whitespace-pre-wrap">+57 301 456 7890</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[24px] top-[16.5px] w-[108.438px]" data-name="Container">
      <Paragraph15 />
      <Paragraph16 />
    </div>
  );
}

function TableCell25() {
  return (
    <div className="absolute h-[69px] left-[741.83px] top-0 w-[156.438px]" data-name="Table Cell">
      <Container39 />
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute bg-[#dcfce7] content-stretch flex h-[24px] items-center left-[24px] px-[12px] py-[4px] rounded-[33554400px] top-[23px] w-[57.328px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#008236] text-[12px]">Activa</p>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="absolute h-[69px] left-[898.27px] top-0 w-[119.391px]" data-name="Table Cell">
      <Text24 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5008 11.9991">
            <path d={svgPaths.p2be95100} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p93ea200} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button21() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pt-[8px] px-[8px] rounded-[10px] size-[34px] top-0" data-name="Button">
      <Icon24 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_8.34%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4999 16.4997">
            <path d={svgPaths.p1d9f8700} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_20.83%_62.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 4.5">
            <path d="M0.75 0.75L3.75 3.75" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button22() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[42px] pt-[8px] px-[8px] rounded-[10px] size-[34px] top-0" data-name="Button">
      <Icon25 />
    </div>
  );
}

function Text25() {
  return <div className="bg-white rounded-[33554400px] shrink-0 size-[16px]" data-name="Text" />;
}

function Button23() {
  return (
    <div className="absolute bg-[#00c950] content-stretch flex h-[24px] items-center left-[84px] pl-[24px] rounded-[33554400px] top-[5px] w-[44px]" data-name="Button">
      <Text25 />
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute h-[34px] left-[24px] top-[17.5px] w-[136.344px]" data-name="Container">
      <Button21 />
      <Button22 />
      <Button23 />
    </div>
  );
}

function TableCell27() {
  return (
    <div className="absolute h-[69px] left-[1017.66px] top-0 w-[184.344px]" data-name="Table Cell">
      <Container40 />
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute border-[#e5e7eb] border-b border-solid h-[69px] left-0 top-[207px] w-[1202px]" data-name="Table Row">
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
      <TableCell24 />
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
    </div>
  );
}

function Icon26() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[41.67%] right-[41.67%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.66667">
            <path d="M0.833333 0.833333H4.16667" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.33%_41.67%_66.67%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.66667">
            <path d="M0.833333 0.833333H4.16667" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_41.67%_12.5%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-20%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5.83333">
            <path d={svgPaths.p3a335380} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_8.33%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 13.3333">
            <path d={svgPaths.p294f4f00} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-1/4 right-1/4 top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 16.6667">
            <path d={svgPaths.p2e423a00} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon26 />
      </div>
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[20px] relative shrink-0 w-[130.203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1e2939] text-[14px]">Hospital San Ignacio</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[36px] items-center left-[24px] top-[16.5px] w-[282.188px]" data-name="Container">
      <Container42 />
      <Text26 />
    </div>
  );
}

function TableCell28() {
  return (
    <div className="absolute h-[69px] left-0 top-0 w-[330.188px]" data-name="Table Cell">
      <Container41 />
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute bg-[#dbeafe] content-stretch flex h-[24px] items-center left-[24px] px-[12px] py-[4px] rounded-[33554400px] top-[23px] w-[81.516px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#1447e6] text-[12px] whitespace-pre-wrap">👥 Cliente</p>
    </div>
  );
}

function TableCell29() {
  return (
    <div className="absolute h-[69px] left-[330.19px] top-0 w-[163.797px]" data-name="Table Cell">
      <Text27 />
    </div>
  );
}

function TableCell30() {
  return (
    <div className="absolute h-[69px] left-[493.98px] top-0 w-[141.5px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[24px] text-[#1e2939] text-[14px] top-[22.5px]">860.007.336-6</p>
    </div>
  );
}

function TableCell31() {
  return (
    <div className="absolute h-[69px] left-[635.48px] top-0 w-[106.344px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[24px] text-[#1e2939] text-[14px] top-[22.5px]">Bogotá</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#1e2939] text-[14px] whitespace-pre-wrap">Patricia Gómez</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px] whitespace-pre-wrap">+57 312 234 5678</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[24px] top-[16.5px] w-[108.438px]" data-name="Container">
      <Paragraph17 />
      <Paragraph18 />
    </div>
  );
}

function TableCell32() {
  return (
    <div className="absolute h-[69px] left-[741.83px] top-0 w-[156.438px]" data-name="Table Cell">
      <Container43 />
    </div>
  );
}

function Text28() {
  return (
    <div className="absolute bg-[#f3f4f6] content-stretch flex h-[24px] items-center left-[24px] px-[12px] py-[4px] rounded-[33554400px] top-[23px] w-[66.031px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#364153] text-[12px]">Inactiva</p>
    </div>
  );
}

function TableCell33() {
  return (
    <div className="absolute h-[69px] left-[898.27px] top-0 w-[119.391px]" data-name="Table Cell">
      <Text28 />
    </div>
  );
}

function Icon27() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5008 11.9991">
            <path d={svgPaths.p2be95100} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p93ea200} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button24() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pt-[8px] px-[8px] rounded-[10px] size-[34px] top-0" data-name="Button">
      <Icon27 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_8.34%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4999 16.4997">
            <path d={svgPaths.p1d9f8700} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_20.83%_62.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 4.5">
            <path d="M0.75 0.75L3.75 3.75" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button25() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[42px] pt-[8px] px-[8px] rounded-[10px] size-[34px] top-0" data-name="Button">
      <Icon28 />
    </div>
  );
}

function Text29() {
  return <div className="bg-white rounded-[33554400px] shrink-0 size-[16px]" data-name="Text" />;
}

function Button26() {
  return (
    <div className="absolute bg-[#d1d5dc] content-stretch flex h-[24px] items-center left-[84px] pl-[4px] rounded-[33554400px] top-[5px] w-[44px]" data-name="Button">
      <Text29 />
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute h-[34px] left-[24px] top-[17.5px] w-[136.344px]" data-name="Container">
      <Button24 />
      <Button25 />
      <Button26 />
    </div>
  );
}

function TableCell34() {
  return (
    <div className="absolute h-[69px] left-[1017.66px] top-0 w-[184.344px]" data-name="Table Cell">
      <Container44 />
    </div>
  );
}

function TableRow5() {
  return (
    <div className="absolute border-[#e5e7eb] border-b border-solid h-[69px] left-0 top-[276px] w-[1202px]" data-name="Table Row">
      <TableCell28 />
      <TableCell29 />
      <TableCell30 />
      <TableCell31 />
      <TableCell32 />
      <TableCell33 />
      <TableCell34 />
    </div>
  );
}

function Icon29() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[41.67%] right-[41.67%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.66667">
            <path d="M0.833333 0.833333H4.16667" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.33%_41.67%_66.67%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.66667">
            <path d="M0.833333 0.833333H4.16667" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_41.67%_12.5%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-20%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5.83333">
            <path d={svgPaths.p3a335380} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_8.33%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 13.3333">
            <path d={svgPaths.p294f4f00} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-1/4 right-1/4 top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 16.6667">
            <path d={svgPaths.p2e423a00} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-[#ffedd4] relative rounded-[10px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon29 />
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[20px] relative shrink-0 w-[206.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#1e2939] text-[14px]">Fundación Alimentos Para Todos</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[36px] items-center left-[24px] top-[16.5px] w-[282.188px]" data-name="Container">
      <Container46 />
      <Text30 />
    </div>
  );
}

function TableCell35() {
  return (
    <div className="absolute h-[68.5px] left-0 top-0 w-[330.188px]" data-name="Table Cell">
      <Container45 />
    </div>
  );
}

function Text31() {
  return (
    <div className="absolute bg-[#ffedd4] content-stretch flex h-[24px] items-center left-[24px] px-[12px] py-[4px] rounded-[33554400px] top-[23px] w-[108.438px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#ca3500] text-[12px]">🍽️ Restaurante</p>
    </div>
  );
}

function TableCell36() {
  return (
    <div className="absolute h-[68.5px] left-[330.19px] top-0 w-[163.797px]" data-name="Table Cell">
      <Text31 />
    </div>
  );
}

function TableCell37() {
  return (
    <div className="absolute h-[68.5px] left-[493.98px] top-0 w-[141.5px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[24px] text-[#1e2939] text-[14px] top-[22.5px]">900.345.678-9</p>
    </div>
  );
}

function TableCell38() {
  return (
    <div className="absolute h-[68.5px] left-[635.48px] top-0 w-[106.344px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[24px] text-[#1e2939] text-[14px] top-[22.5px]">Medellín</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#1e2939] text-[14px] whitespace-pre-wrap">Roberto Silva</p>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px] whitespace-pre-wrap">+57 304 567 8901</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[24px] top-[16.5px] w-[108.438px]" data-name="Container">
      <Paragraph19 />
      <Paragraph20 />
    </div>
  );
}

function TableCell39() {
  return (
    <div className="absolute h-[68.5px] left-[741.83px] top-0 w-[156.438px]" data-name="Table Cell">
      <Container47 />
    </div>
  );
}

function Text32() {
  return (
    <div className="absolute bg-[#dcfce7] content-stretch flex h-[24px] items-center left-[24px] px-[12px] py-[4px] rounded-[33554400px] top-[23px] w-[57.328px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#008236] text-[12px]">Activa</p>
    </div>
  );
}

function TableCell40() {
  return (
    <div className="absolute h-[68.5px] left-[898.27px] top-0 w-[119.391px]" data-name="Table Cell">
      <Text32 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5008 11.9991">
            <path d={svgPaths.p2be95100} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p93ea200} id="Vector" stroke="var(--stroke-0, #4F39F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button27() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pt-[8px] px-[8px] rounded-[10px] size-[34px] top-0" data-name="Button">
      <Icon30 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_8.34%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4999 16.4997">
            <path d={svgPaths.p1d9f8700} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_20.83%_62.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 4.5">
            <path d="M0.75 0.75L3.75 3.75" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button28() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[42px] pt-[8px] px-[8px] rounded-[10px] size-[34px] top-0" data-name="Button">
      <Icon31 />
    </div>
  );
}

function Text33() {
  return <div className="bg-white rounded-[33554400px] shrink-0 size-[16px]" data-name="Text" />;
}

function Button29() {
  return (
    <div className="absolute bg-[#00c950] content-stretch flex h-[24px] items-center left-[84px] pl-[24px] rounded-[33554400px] top-[5px] w-[44px]" data-name="Button">
      <Text33 />
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute h-[34px] left-[24px] top-[17.5px] w-[136.344px]" data-name="Container">
      <Button27 />
      <Button28 />
      <Button29 />
    </div>
  );
}

function TableCell41() {
  return (
    <div className="absolute h-[68.5px] left-[1017.66px] top-0 w-[184.344px]" data-name="Table Cell">
      <Container48 />
    </div>
  );
}

function TableRow6() {
  return (
    <div className="absolute h-[68.5px] left-0 top-[345px] w-[1202px]" data-name="Table Row">
      <TableCell35 />
      <TableCell36 />
      <TableCell37 />
      <TableCell38 />
      <TableCell39 />
      <TableCell40 />
      <TableCell41 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute h-[413.5px] left-0 top-[44.5px] w-[1202px]" data-name="Table Body">
      <TableRow1 />
      <TableRow2 />
      <TableRow3 />
      <TableRow4 />
      <TableRow5 />
      <TableRow6 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[458px] overflow-clip relative shrink-0 w-full" data-name="Table">
      <TableHeader />
      <TableBody />
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[458px] items-start overflow-clip relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <Table />
    </div>
  );
}

function Companies() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[744px] items-start relative shrink-0 w-full" data-name="Companies">
      <Container5 />
      <Container7 />
      <Container20 />
      <Container24 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1250px]" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pt-[24px] px-[24px] relative rounded-[inherit] size-full">
        <Companies />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[909px] relative shrink-0 w-[1249px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <MainContent />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex h-[909px] items-start relative shrink-0 w-full" data-name="App">
      <Sidebar />
      <Container4 />
    </div>
  );
}

export default function Body() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Body">
      <App />
    </div>
  );
}