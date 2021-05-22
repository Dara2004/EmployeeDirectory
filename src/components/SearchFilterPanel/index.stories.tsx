// import React from 'react';
// import type { Story, Meta } from '@storybook/react';
// import { Center, Text } from '@chakra-ui/react';
// import { faSnowman } from '@fortawesome/free-solid-svg-icons';
// import SearchFilterPanelProps, {
//   SearchFilterDrawerAndButtonProps,
// } from './indexx';

// export default {
//   title: 'Components/SearchFilterDrawer',
//   component: SearchFilterDrawerAndButton,
//   parameters: { layout: 'fullscreen' },
// } as Meta;

// const Template: Story<SearchFilterDrawerAndButtonProps> = (args) => (
//   <SearchFilterDrawerAndButton {...args} />
// );

// export const SampleFilter = Template.bind({});
// SampleFilter.args = {
//   filtersList: [
//     {
//       name: 'Companies',
//       filters: [
//         {
//           id: '01',
//           type: 'company',
//           name: 'Acme Seeds Inc.',
//           children: [
//             {
//               id: '01',
//               type: 'office',
//               name: 'Corporate',
//               children: [
//                 {
//                   id: '01',
//                   type: 'group',
//                   name: 'Administration',
//                   children: [],
//                 },
//                 {
//                   id: '02',
//                   type: 'group',
//                   name: 'Marketing',
//                   children: [],
//                 },
//                 {
//                   id: '03',
//                   type: 'group',
//                   name: 'Sales',
//                   children: [],
//                 },
//                 {
//                   id: '04',
//                   type: 'group',
//                   name: 'Accounting',
//                   children: [],
//                 },
//                 {
//                   id: '05',
//                   type: 'group',
//                   name: 'Administration',
//                   children: [],
//                 },
//                 {
//                   id: '06',
//                   type: 'group',
//                   name: 'Administration',
//                   children: [],
//                 },
//                 {
//                   id: '07',
//                   type: 'group',
//                   name: 'Administration',
//                   children: [],
//                 },
//                 {
//                   id: '08',
//                   type: 'group',
//                   name: 'Administration',
//                   children: [],
//                 },
//                 {
//                   id: '09',
//                   type: 'group',
//                   name: 'Administration',
//                   children: [],
//                 },
//                 {
//                   id: '15',
//                   type: 'group',
//                   name: 'Human Resources',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '02',
//               type: 'office',
//               name: 'Vancouver',
//               children: [
//                 {
//                   id: '01',
//                   type: 'group',
//                   name: 'Human Resources',
//                   children: [],
//                 },
//                 {
//                   id: '02',
//                   type: 'group',
//                   name: 'Human Resources B',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '15',
//               type: 'office',
//               name: 'Vancouver B',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '02',
//           type: 'company',
//           name: 'Acme Planting Ltd.',
//           children: [
//             {
//               id: '01',
//               type: 'office',
//               name: 'Vancouver',
//               children: [
//                 {
//                   id: '02',
//                   type: 'group',
//                   name: 'Administration',
//                   children: [],
//                 },
//                 {
//                   id: '03',
//                   type: 'group',
//                   name: 'Marketing',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '02',
//               type: 'office',
//               name: 'Victoria',
//               children: [
//                 {
//                   id: '04',
//                   type: 'group',
//                   name: 'Sales',
//                   children: [],
//                 },
//                 {
//                   id: '05',
//                   type: 'group',
//                   name: 'Service',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '03',
//           type: 'company',
//           name: 'Acme Harvesting Ltd.',
//           children: [
//             {
//               id: '03',
//               type: 'office',
//               name: 'Kelowna',
//               children: [
//                 {
//                   id: '03',
//                   type: 'group',
//                   name: 'Administration',
//                   children: [],
//                 },
//                 {
//                   id: '04',
//                   type: 'group',
//                   name: 'Marketing & Sales',
//                   children: [],
//                 },
//                 {
//                   id: '05',
//                   type: 'group',
//                   name: 'Distribution',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '04',
//               type: 'office',
//               name: 'Prince George',
//               children: [
//                 {
//                   id: '08',
//                   type: 'group',
//                   name: 'Operations',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '05',
//               type: 'office',
//               name: 'Vancouver',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '04',
//           type: 'company',
//           name: 'Acme Logistics Ltd.',
//           children: [
//             {
//               id: 'A',
//               type: 'office',
//               name: 'Vancouver',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '05',
//           type: 'company',
//           name: 'Acme Ltd.',
//           children: [],
//         },
//         {
//           id: '10',
//           type: 'company',
//           name: 'YHHAVXUDIQGOWB',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'TWKCUIYI',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'KLBELLOXAS',
//                   children: [],
//                 },
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'TTNEUWOGPB',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'RKSLTSGG',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'CJLLSMCCIF',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'XGESPXMU',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'GDSRVDLVPM',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'RGUUVOJOED',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'HFDUEEMKAF',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '11',
//           type: 'company',
//           name: 'CXKADIJJUADNSU',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'BCOPVSEM',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'XCHUQBCCWT',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'FLCERIAQYH',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'SFRPOOYD',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'LVIFXTHF',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'WGNHYWDXRV',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'JXFHSLAFHF',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'MMWOGUJGQW',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'ETFPMNPKHS',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '12',
//           type: 'company',
//           name: 'UXTTWFOPFHUAQC',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'GGJVDVEE',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'SMPTXEVVBV',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'FOOUJYVRYW',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'NUDTOXVT',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'JMBUXLYKGW',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'RDKPPYYKSD',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'HSSLHDVC',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'EFNPVAYOBP',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'JLLIKQECRY',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '13',
//           type: 'company',
//           name: 'YPOWXMVFNDMBRI',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'FGIMPDRP',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'PEHAUWLMRX',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'IWCUMPQS',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'WOJGAPTNMQ',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'EKEQUEBH',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'HJCYBOCRBN',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'FKOBDACWVL',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'OWEDABECBA',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'AFDWMEPDSD',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '14',
//           type: 'company',
//           name: 'SOXQWTKEMNHSRQ',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'JTOXKHKE',
//               children: [
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'QNATMVYHLA',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'LQWKDNDX',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'YGKNGSBQFT',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'OULBADQEBK',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'MUIYWWNP',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'XNMJEDABMP',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'VFRKJAUQBD',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'RCRJXTQSDC',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '15',
//           type: 'company',
//           name: 'BLOYDMHJACKQKJ',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'XKLXNJWG',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'FXBAQDMFTK',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'SHBAQLIGQK',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'LGHXPNAW',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'HYXAXORPHF',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'HCLPOQSHOC',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'NITNCWBM',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'IIYVNLCDDV',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'EHKCLXBPOS',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '16',
//           type: 'company',
//           name: 'CKKNOVOCJMGTKC',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'PQDMOHER',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'DKOYHCKRVF',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'JRPUEFARPK',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'XSUULHPYPW',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'VMGRIPXE',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'JOVNWNCUBL',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'AKKUCQUPAG',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'STHRWKWQ',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'IVRWPTUQYW',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '17',
//           type: 'company',
//           name: 'HXWLOCTYHCWWMS',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'TJRQICIL',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'PGIIRYTJQU',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'GYWQNOID',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'RUJYTYNPCA',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'TPQWQMMVXC',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'MUYKXPYFEX',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'YWQUEORKAL',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'FNHNIVWETU',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'GEPCTRKR',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '18',
//           type: 'company',
//           name: 'GOYCSPLOFPOHBL',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'RLBNLPRX',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'LJRTLEFTCT',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'MXWPEXRKHM',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'AOXKOUUE',
//               children: [
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'MOHHIXFKUI',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'IDGIIBIIDI',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'KKUCGNXR',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'FTFEWTWPBX',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'HISYCYMAGC',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '19',
//           type: 'company',
//           name: 'EGICFJISGOUMMM',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'PQJNFVFE',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'ACWTMCGOIT',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'OWJBABABGY',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'POPFPIMM',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'JYQCAQELHU',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'LTXARNYARD',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'QCWSOSQR',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'ESUOPSNBMK',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'POWHIBWETW',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '20',
//           type: 'company',
//           name: 'SLJXMSJHKUJFLY',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'USFMFWXT',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'XBFOMEIKSC',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'WVQFGFPPSW',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'FTFUEWCU',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'XPBCFLDJRB',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'KTYGNSFFJQ',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'ADUYPOTD',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'JXBJBUVJNF',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'DDDWQITAVD',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '21',
//           type: 'company',
//           name: 'EUWKIORVKRFKPR',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'RICCTTWQ',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'QFMWYTFLFC',
//                   children: [],
//                 },
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'QDCFNVQDPG',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'ROFWPGTXPO',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'DDBVCPHMWU',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'YPPKOVFV',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'IHYSMCFC',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'RXMJXFPCDS',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'MXTPMMOLWM',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '22',
//           type: 'company',
//           name: 'TYSNNUGDYOFDVP',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'GRTGBPAB',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'USQFNOMECJ',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'GYGGPFJXOO',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'KEARUCJHGN',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'KYPEGNCM',
//               children: [
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'EFIRHMQDDK',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'EPISEMQL',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'MNHYJYJAHD',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'BXKPJDXHXG',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '23',
//           type: 'company',
//           name: 'AKDIPDFMLCCEDK',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'XHSPTCGA',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'IRQGRNKSQX',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'NWBLTMWD',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'UPVDUSIRNF',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'HBVAEBQC',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'OURLALNVIT',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'AJJDDLJOSI',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'BPSDWYOQDD',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'IHTBRDBMOS',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '24',
//           type: 'company',
//           name: 'EFTSPCUSSAKYUA',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'KXFJUJGA',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'YTGJVWRYVU',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'QBOKOQBEAD',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'CMXRWIWIPO',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'FLRDUCWM',
//               children: [
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'IGRGXUODYW',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'QLGKXRXK',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'SENXPTQSRK',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'BAIDNMKXOU',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '25',
//           type: 'company',
//           name: 'LUBOVFGVJJIJQW',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'LJNMBERG',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'IUJQMCGMSB',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'RCIEYXEPXS',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'JUUSCWCAMX',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'QYWSQQQC',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'LMSIYQDCAF',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'DPHMLYHUPM',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'VNWSQTCX',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'YGGUOTRJJC',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '26',
//           type: 'company',
//           name: 'EPYYPOVMBXCPXY',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'FPYGMFVI',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'HUDPMKBBYW',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'SSHJVXGVSM',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'CCVTRXTR',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'WAFNTOCXKC',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'ILFCDFJBSD',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'PRVTIVFH',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'CFLYWSLQCP',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'NRJLMPJRPJ',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '27',
//           type: 'company',
//           name: 'LABIUWAJEPRTTN',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'XNFQSJMC',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'LELDOAHIEV',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'NACGQVUX',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'RHVUFIFUVD',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'MVOPPKBTYY',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'GNAVFLRO',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'FRAXTRQWFA',
//                   children: [],
//                 },
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'PCPQHHBTJS',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'XNXXGKOWCR',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '28',
//           type: 'company',
//           name: 'JYKCXRRXWQVVLR',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'RBJLTTII',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'MDQSKARPIR',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'MCVVGACVWM',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'SIMYRTNI',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'BOLMNEGSPO',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'XBXRKYVIFS',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'TAKVIMJLXF',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'EGOILSUO',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'PMAOQVDAXJ',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '29',
//           type: 'company',
//           name: 'FKULHMAXFEAOOT',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'JWHFAUYO',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'RWGFPVELBG',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'AINWFRPJPH',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'CKHPPRJA',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'SXNUXWYFXN',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'PAYVFHSIBS',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'NYBQDTDXGL',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'KLNTFICK',
//               children: [
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'WTJBQQJJNF',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '30',
//           type: 'company',
//           name: 'CPFWPAWHSXUVHG',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'SGGQVUGY',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'PCEXCGOLWF',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'JJTWDOVK',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'KHPUCSIPAJ',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'NMYPMADEUK',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'QBGCDEGR',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'IODFFKPUVD',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'WEDMKYIUPO',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'RUOXPIFESV',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '31',
//           type: 'company',
//           name: 'RUHANVCXNHSGCG',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'ILPGXXCV',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'TXRFPFIFNG',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'CDTSPCRGVF',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'DNSCYUDBLO',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'SEGFPEVQMH',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'QBXHEBXMYT',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'DIWOOTQH',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'UXQNNHLJ',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'KASHJJHDQY',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '32',
//           type: 'company',
//           name: 'AKNQCJVVDPCMTF',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'WCDGKDEP',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'FRAESJYFWE',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'NOTJAPKCEA',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'WTNPIENPTS',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'JGGJUCKY',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'TMRAJOLQKP',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'EPWTOCQFIQ',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'THFMAVOYPL',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'EVBNTGTN',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '33',
//           type: 'company',
//           name: 'YVCYWCSIITYACE',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'VIDTOIFY',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'RWOUUNPFSC',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'HQIFNVKIIC',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'PAUWINEBUM',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'KNLFRHTQ',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'WRUXAOJIJQ',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'IDLSTIMQSA',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'TCLIOOVV',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'EGWMPPHIYE',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '34',
//           type: 'company',
//           name: 'NSMNDVCYEJBTAD',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'BNEICYHM',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'IOBRYNSPAE',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'JEDKASUD',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'TPNPKTTTKB',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'KLGKYVBSMG',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'AKYUSQYM',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'RMCHETLHAY',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'WMLBPPTMWR',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'JXNFGWUQQU',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '35',
//           type: 'company',
//           name: 'VDQFNSLIXQLQTS',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'DNFFWXDA',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'DBFHCEIMQI',
//                   children: [],
//                 },
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'PLCGHJFVJX',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'QKVDFBBTSX',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'VLIPNKCLCI',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'XGOGHDMOJA',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'VTOOHGVUVK',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'BHFVSHAV',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'TIYCXAIC',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '36',
//           type: 'company',
//           name: 'FJVHIVBOWAAINQ',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'INDFBOJR',
//               children: [
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'DRKBRDJMNL',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'YWGOPAWC',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'AOVSPEYNDI',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'QTHHGFTFTV',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'CJTFDRBM',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'IGABRBMITK',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'MQRCPBRPOC',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'PQLUVJHHYJ',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '37',
//           type: 'company',
//           name: 'XFCGIFQMFDVBRK',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'HSRXTHSF',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'EEVYFMEHBO',
//                   children: [],
//                 },
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'RCSLDEDKUK',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'DWDUWEHH',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'UQJMOQPEBS',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'RKJYPIBDKJ',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'OYBXHTQNCB',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'FHNYDYPG',
//               children: [
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'TKEQYIETPJ',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '38',
//           type: 'company',
//           name: 'DPVQOISCTTMSTW',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'TFUMKKIV',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'EXRRISGYWD',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'BVGLWQVKIY',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'DQXNEUWNQC',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'VPHSNITGNE',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'HXGDNKAGVT',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'OATJRCJC',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'KOWDROEH',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'QTHBLGGOSM',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '39',
//           type: 'company',
//           name: 'BHYNLBGGXQNLXT',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'MKORPRYY',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'QUCUBRLTEC',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'PCLAMYBQPD',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'SCMFFNLS',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'FHSQYJGLUD',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'YCWYCPOY',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'YOYQPCBDBI',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'FPPYUQKFVT',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'RMCVWWSAIC',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '40',
//           type: 'company',
//           name: 'QIPFJMGAAPVYBG',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'XVDXGWHY',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'HDVXESDQVH',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'YARQWSEUMY',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'OPGPFJXW',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'BPDGATOXNO',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'HVDWAEEIWL',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'BICCVKPX',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'YMEEDBBPJK',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'WHBGHXUEFW',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '41',
//           type: 'company',
//           name: 'QWMIBLJNUUUDGA',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'MXONESML',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'JYLGBHXGBR',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'SINJJLWIRG',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'QFXTJIYOCV',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'XVGNCUWM',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'VOSSPECWQR',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'DBWAGIRBFA',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'WIBCVMXD',
//               children: [
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'MTKGFUHWVQ',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '42',
//           type: 'company',
//           name: 'EKUYAYRAWFDWWD',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'JTILGLHU',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'BWFMVCGKSU',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'RHRKGGWQTF',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'UGKQCYBP',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'LVHDAWLPOJ',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'HPGRWHMAKG',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'UXODKVDQ',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'IUFNDDIURR',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'ARVUXDUBYC',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '43',
//           type: 'company',
//           name: 'KCPPUQNXDXJVVV',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'NIILPYKL',
//               children: [
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'QAXEMRAMSQ',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'HCEUVOLB',
//               children: [
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'MMODQOMOOB',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'ANKWBCDO',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'BUJRDLEAYR',
//                   children: [],
//                 },
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'QKTKCQEQFV',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'MVXNUSPDMM',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'AXCWMGSWIB',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '44',
//           type: 'company',
//           name: 'PQDOSKNQHBXPHF',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'KMPTCCFV',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'CCPADKNU',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'OJBDVQECCR',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'BRQWISJUPI',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'KIEDFEWM',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'RORVWHVBDF',
//                   children: [],
//                 },
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'RDMRUCJOOO',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'QFHDVATTJM',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'LMLEYLKCVC',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '45',
//           type: 'company',
//           name: 'XBAAPCEKVAPNIY',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'OKEAYVHV',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'FYRKOGMPNP',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'SXUWCAOYPH',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'OUTVUXCB',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'WXQYCLGSSR',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'EXKQSKAQLV',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'WQRJVQXG',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'WXYTOHWOUJ',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'FRKHMQSTDI',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '46',
//           type: 'company',
//           name: 'NFVEXMMOKOBWDC',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'XXTPQIQN',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'GIWTBJCT',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'UQERVPEDOE',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'DSQHSDGRFA',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'KVAREALX',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'RGIXYSPVDF',
//                   children: [],
//                 },
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'CBDRFMLYBX',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'CTMPNFMDON',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'QGBNOLPOFF',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '47',
//           type: 'company',
//           name: 'EFTRFLTTPCXVPC',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'CSJURGJW',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'WWMBXATQWY',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'DRBEETIUPH',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'TDXNEUMI',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'UITOFFJI',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'PUVVWUSIFL',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'MSHNKMUMXF',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'AIDHPKJUDY',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'UJAHYFNMKG',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '48',
//           type: 'company',
//           name: 'VMVJTFIASEYKKJ',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'BWNCHEXI',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'QPITEKRAKY',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'WBAVGNPUOP',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'EIIHHCKF',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'CRTWONQUPJ',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'SXOXHGLVSJ',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'YIKPKXMO',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'HXJWRGFNDQ',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'UBXFMKAXSP',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '49',
//           type: 'company',
//           name: 'TYIQMSURMXGRPS',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'DOMRFSNW',
//               children: [
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'LGLCFHMEGY',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'HCNIRBQL',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'CONSVWGVXN',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'LBDICTOHPA',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'GDWSCFEP',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'MTBPJWDCYB',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'KVXLYRFCNC',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'FRVXVSAWKH',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '50',
//           type: 'company',
//           name: 'HMVJFKADULCLLD',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'DENXAGEN',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'MGMYLFQTMS',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'CMIDYYBC',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'JQEGRVLXLY',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'TVODVEAQPR',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'MBAOXISPDC',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'JYMSUDVR',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'PSBQDMGLAH',
//                   children: [],
//                 },
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'EHVWBOYLHG',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '51',
//           type: 'company',
//           name: 'YCFXLAGQTOKFMA',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'XOWDVECA',
//               children: [
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'VXXHPMORYV',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'QHSKMYUK',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'VRXBROJRYK',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'VMLJLQREUB',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'DQJYNJNORO',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'NSYEQMSF',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'KHAFEQXPGG',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'SHROVRDDWC',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '52',
//           type: 'company',
//           name: 'KYWQNODCCOOOUA',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'LOCTXRDJ',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'GTGUFNXAGU',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'NOGJBFYJNI',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'HJJJDTSL',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'FMTVXHCUSK',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'OCQRGRBKQH',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'EEVVMQQCET',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'EDQKCMUB',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'AMSDFMDQDU',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '53',
//           type: 'company',
//           name: 'AWIEIFILEPBUUE',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'VWRGCSXT',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'DYHMJQUGKL',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'LOLFUEVHRR',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'DCYWLFSEIH',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'HWCFYNPCJG',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'LNQHVBSP',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'YUOTVVVR',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'JEKVVJLBLR',
//                   children: [],
//                 },
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'JTQCEALIDI',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '54',
//           type: 'company',
//           name: 'JQASAHWCTVPCIK',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'REDNSSCW',
//               children: [
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'NSIOBLAVDV',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'MBOHQDWR',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'AKPABOIDWS',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'SRWLFBRUJK',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'IAHXQTCVIQ',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'KPVHYAJM',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'EQHUXRWEBS',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'TPEKNFHOCY',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '55',
//           type: 'company',
//           name: 'CLOUAKXLSYQPKE',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'UQDVGEUJ',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'QCQWCLNIIF',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'OHFUWXBGJJ',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'PBURWTLU',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'LBWSQGNJRD',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'TPHJAIQW',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'XYPLHXFFMK',
//                   children: [],
//                 },
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'YQYNPAOGAE',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'XBOOMULIXJ',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '56',
//           type: 'company',
//           name: 'CTUHFTCJKTIAKO',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'NTDKDJPE',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'NWJLYRUERI',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'YTWHRCWBXX',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'XPKAQDXK',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'EQIFBHJFVJ',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'QDIMVKJYUG',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'SATCCREL',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'BICUNOKOJK',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'JIIECFRSVR',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '57',
//           type: 'company',
//           name: 'NBIVTTJUESVTGC',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'GSXHBLEL',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'BLOOABWISM',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'XAGCENNTKP',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'VQOOBAFBSQ',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'WTTTBTYRFT',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'HHNPEXGV',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'MLBRKGOWEH',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'FNJXJSGK',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'PJDYMHVORW',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '58',
//           type: 'company',
//           name: 'IPTPLDVYPIIRLM',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'HBPVDDBM',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'VSLYYSNXWQ',
//                   children: [],
//                 },
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'JSVXYXTDMQ',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'OXRXEKCNIU',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'KEUYWLXXFI',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'DEWBOTXAHP',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'NXNQTFUM',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'NHCPFDIA',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'VCNCSHVNCT',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '59',
//           type: 'company',
//           name: 'CXEJJEEBVNFUYH',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'XUCBUSEA',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'XWDPYDDMGW',
//                   children: [],
//                 },
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'OXEUTOQAPA',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'DVLSFQHGLA',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'BNAKIMYAIU',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'EVUACCLO',
//               children: [
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'KVJNAPMWLE',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'VXBRJCPDDS',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'MIQUAGJS',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '60',
//           type: 'company',
//           name: 'FCNYDASNAMBVSU',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'QUKAQCIA',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'PJJWWSAPXD',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'YAPIFGRI',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'QBDVIJYYHS',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'NALMLBRUFM',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'FAPVOLHP',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'GUWNJAIIMT',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'EFTFBVRUVX',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'QASDOOPTUV',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '61',
//           type: 'company',
//           name: 'TAVGWDCPCXCOEO',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'HQLYNEVL',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'OTVFDTEKOD',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'HEMBCTSETJ',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'DXOCTGDI',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'CSGLKRUANQ',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'PMVYHGLYHD',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'XKOGBDGK',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'OYTEUBDNRU',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'KUBLFFNDQL',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '62',
//           type: 'company',
//           name: 'XHWXVQRHNDRUWN',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'IJRRLNEH',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'LWYUHYQQMA',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'WRAXQNLXNN',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'ESMFLLAG',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'SALOAASRTC',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'TBPLGHUPNH',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'ICWXWUPYAT',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'DPPDUYPU',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'FVVHBNPXKK',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '63',
//           type: 'company',
//           name: 'QDVRXKQLBXJLOL',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'OKYMSFBS',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'EHOOOJBMQQ',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'QXUWPFATIN',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'DVCVKOPFKS',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'UQUUGRBX',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'KGNDLXBWDE',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'GELDSCKTQV',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'YGEBVSHB',
//               children: [
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'JRQICOBRSB',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '64',
//           type: 'company',
//           name: 'NFQPSCUOGBYLPV',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'LIUNYSAQ',
//               children: [
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'CGARDFQWVG',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'TDQCPXVRVI',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'UUVWTEPF',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'BUVCIWJYFC',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'LVTGSSKSDK',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'MPABJWGP',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'GDFTIIQHHI',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'WTWPRWHJRM',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '65',
//           type: 'company',
//           name: 'AHSNNPPQTPUSLH',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'DVFLNSMQ',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'XKNGYQWAMQ',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'DJAVECEL',
//               children: [
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'QGQIEFQEXW',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'YXDUSFNB',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'MPMJVTKYVY',
//                   children: [],
//                 },
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'PEEFHELPWU',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'XKHSCJHHIA',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'ICTKMJINIV',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '66',
//           type: 'company',
//           name: 'UIPWGMLYQQIMPB',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'CNQULTWH',
//               children: [
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'HLHOFFPATD',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'YBETFNAK',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'DFRWHGLSOH',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'YVQMEYMGIA',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'HCHDOWVV',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'ENNLSLBGDB',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'HSAPUQUMCQ',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'FXOUUFWGYV',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '67',
//           type: 'company',
//           name: 'OVKIEQSRWTDLEJ',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'XNVTPDSC',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'VUCTOYBBER',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'GKRGANFMWM',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'VJQITOCNRC',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'HPCUHXTE',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'LXIDURXTFO',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'DHWVGMOL',
//               children: [
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'JVGWXPKNJA',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'HRKEKVSXTS',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '68',
//           type: 'company',
//           name: 'DRVWYFQRIASSHR',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'GXWEECXP',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'HFGVIUVLWL',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'HAGPYTSLSI',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'LDKFCTICFQ',
//                   children: [],
//                 },
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'CORVMJFGNR',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'PGJFEJXM',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'NAOBAPSQ',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'SOVYCAOOAQ',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'YUJASJDJXY',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: '69',
//           type: 'company',
//           name: 'PGCAOPWGNDDNNJ',
//           children: [
//             {
//               id: '1',
//               type: 'office',
//               name: 'WGWIQYNS',
//               children: [
//                 {
//                   id: '6',
//                   type: 'group',
//                   name: 'OEAEFRXBFH',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '2',
//               type: 'office',
//               name: 'JIBUWOXY',
//               children: [
//                 {
//                   id: '1',
//                   type: 'group',
//                   name: 'KDUGUSSDDN',
//                   children: [],
//                 },
//               ],
//             },
//             {
//               id: '3',
//               type: 'office',
//               name: 'VEYHXIVI',
//               children: [
//                 {
//                   id: '2',
//                   type: 'group',
//                   name: 'OCOJRMBMQQ',
//                   children: [],
//                 },
//                 {
//                   id: '3',
//                   type: 'group',
//                   name: 'MOXSLRUWCH',
//                   children: [],
//                 },
//                 {
//                   id: '4',
//                   type: 'group',
//                   name: 'GCLBKIIGNM',
//                   children: [],
//                 },
//                 {
//                   id: '5',
//                   type: 'group',
//                   name: 'MPFJIKTHDY',
//                   children: [],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       name: 'Skills',
//       filters: [
//         {
//           id: '1',
//           type: 'skill category',
//           name: 'Agriculture',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: 'Planting',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: 'Harvesting',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: 'Fertilizing',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: 'Irrigating',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: 'Soil Preparation',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '10',
//           type: 'skill category',
//           name: ' DIAGONAL',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' HERALD',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' PLAYTIME',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' DESPERATE',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' NEON',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' DIAMETRIC',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '11',
//           type: 'skill category',
//           name: ' BOARDINGHOUSE',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' HEADLOCK',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' AGE',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' AMERICANA',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' GLUMLY',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' HOST',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '12',
//           type: 'skill category',
//           name: ' ORTHODOX',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' ZOMBIE',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' GREY',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' FORTRESS',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' BEAST',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' HEADACHE',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '13',
//           type: 'skill category',
//           name: ' GREATEST',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' STEALTHY',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' APOCALYPSE',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' HEAT',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' TWELVE',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' AUTONOMOUS',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '14',
//           type: 'skill category',
//           name: ' AFFLICTION',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' CULTURAL',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' AMBIGUOUS',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' ELECTRON',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' FESTIVAL',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' BECAUSE',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '15',
//           type: 'skill category',
//           name: ' HEAVY',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' PESKY',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' AMBULATORY',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' PINK',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' STAR',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' PROVIDER',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '16',
//           type: 'skill category',
//           name: ' BOUTIQUE',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' BINDING',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' DIAMOND',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' DIARY',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' TRAGIC',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' FACTION',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '17',
//           type: 'skill category',
//           name: ' CHILDREN',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' CREEPY',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' DISCONNECT',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' CHUNK',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' COMPUTER',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' IMPOSTER',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '18',
//           type: 'skill category',
//           name: ' BEAD',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' CONCEPT',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' DISTRIBUTION',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' ACADEMIC',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' DONATION',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' VULTURE',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '19',
//           type: 'skill category',
//           name: ' BABY',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' MOMENT',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' HEARSE',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' BRUSH',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' EXTREMIST',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' AMORAL',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '2',
//           type: 'skill category',
//           name: 'Accounting',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: 'Transaction Processing',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: 'Reconciling',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: 'Auditing',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '20',
//           type: 'skill category',
//           name: ' AFTERTASTE',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' CRUTCH',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' JOYSTICK',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' SEWAGE',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' FINGER',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' LADY',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '21',
//           type: 'skill category',
//           name: ' PALE',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' QUEEN',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' HONEYMOON',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' FERMENTATION',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' BEEFCAKE',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' DOWNTOWN',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '22',
//           type: 'skill category',
//           name: ' FRIGHTENING',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' ULTIMATE',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' ZERO',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' MISTAKEN',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' HANDLEBARS',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' GRADE',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '23',
//           type: 'skill category',
//           name: ' CURATOR',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' HOPE',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' CONSPIRACY',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' CRASHER',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' CRUCIFIXION',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' BRANCH',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '24',
//           type: 'skill category',
//           name: ' AXIOM',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' ANYTIME',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' SCHEMER',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' IVORY',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' CHAOTIC',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' DOOM',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '25',
//           type: 'skill category',
//           name: ' STIFF',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' HOUND',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' INJUSTICE',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' COMPELLING',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' TENSE',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' ETERNAL',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '26',
//           type: 'skill category',
//           name: ' PATTERN',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' INJURY',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' EXPANSION',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' VIPER',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' FILAMENT',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' ALLOWABLE',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '27',
//           type: 'skill category',
//           name: ' HINGE',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' FORM',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' SUBWAY',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' RETREAT',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' FLAMBOYANT',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' AUXILIARY',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '28',
//           type: 'skill category',
//           name: ' CRATER',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' FREEZE',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' DIAMETRIC',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' LUXURY',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' GOGGLES',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' CALENDAR',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '29',
//           type: 'skill category',
//           name: ' ACROBAT',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' BLURB',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' NEUROTIC',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' MIXER',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' VULTURE',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' ABSURDITIES',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '3',
//           type: 'skill category',
//           name: 'Management',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: 'Planning',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: 'Budgeting',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: 'Performance Reviews',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '30',
//           type: 'skill category',
//           name: ' GLOOMY',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' BEAK',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' DOWNRIVER',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' HEADQUARTERS',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' STAGE',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' LIBERATION',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '31',
//           type: 'skill category',
//           name: ' EASIER',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' SPIKE',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' SPRITES',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' ALARM',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' PARASITE',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' HUNCHBACK',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '32',
//           type: 'skill category',
//           name: ' KITTEN',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' ESSENCE',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' GROSS',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' CHOKE',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' COGNITIVE',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' DESPISABLE',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '33',
//           type: 'skill category',
//           name: ' IDENTITY',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' ROTTEN',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' GRINDING',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' METALLIC',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' KITTEN',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' KICK',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '34',
//           type: 'skill category',
//           name: ' COSTUME',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' LEVITATING',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' HISTORIC',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' EXTRAVAGANT',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' FAITHLESS',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' DRAG',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '35',
//           type: 'skill category',
//           name: ' BRILLIANT',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' DETAILS',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' CRUTCH',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' BOUTIQUE',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' WARM',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' ADEQUATE',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '36',
//           type: 'skill category',
//           name: ' LAND',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' HELLFIRE',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' HEAT',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' COMET',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' CELEBRITY',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' UNDERSEA',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '37',
//           type: 'skill category',
//           name: ' CHARISMATIC',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' PRIVATE',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' ASSOCIATE',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' BIT',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' DOMINANT',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' BELL',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '38',
//           type: 'skill category',
//           name: ' HERALD',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' THINK',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' LARGE',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' EYETOOTH',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' FRONTIER',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' COMBAT',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '39',
//           type: 'skill category',
//           name: ' RIOT',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' FLAVOR',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' SMART',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' HAUNTING',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' CALL',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' PLASMA',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '4',
//           type: 'skill category',
//           name: 'Marketing & Sales',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: 'Preparing Marketing Materials',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: 'Customer Service',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: 'Marketing Strategies',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '40',
//           type: 'skill category',
//           name: ' PITCH',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' VIXEN',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' AGE',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' PRIVILEGE',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' FIERY',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' TREED',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '41',
//           type: 'skill category',
//           name: ' EVOKE',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' CRIMSON',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' SWINDLER',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' FAITHLESS',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' PIECES',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' INNOCENT',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '42',
//           type: 'skill category',
//           name: ' ARSON',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' FEELINGS',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' EQUAL',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' ATTRIBUTE',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' SKY',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' HACK',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '43',
//           type: 'skill category',
//           name: ' FORGIVEN',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' ALCOHOLIC',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' WOLF',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' CHOKING',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' STALLION',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' ENEMY',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '44',
//           type: 'skill category',
//           name: ' VIBRATION',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' WIFE',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' AIM',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' FRUSTRATION',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' GROANER',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' AIR',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '45',
//           type: 'skill category',
//           name: ' DISMISSAL',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' DRESS',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' EPHEMERAL',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' GETAWAY',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' JOYRIDE',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' GRANULARITY',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '46',
//           type: 'skill category',
//           name: ' DAREDEVIL',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' LIBERAL',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' POET',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' RIB',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' TERROR',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' ABSENCE',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '47',
//           type: 'skill category',
//           name: ' GLIMMER',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' BULLET',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' BEST',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' HEAT',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' DEER',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' NASTY',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '48',
//           type: 'skill category',
//           name: ' LORD',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' FUMBLING',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' ELEVATOR',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' MARY',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' BAYONET',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' PREFAB',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '49',
//           type: 'skill category',
//           name: ' UNSURE',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' WHALE',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' FATHEAD',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' HORRIFIC',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' HEARTS',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' GOLDFISH',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '5',
//           type: 'skill category',
//           name: 'HEAD',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' WILLOW',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' ADORABLE',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' DIVINE',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' EXCHANGE',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' KING',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '50',
//           type: 'skill category',
//           name: ' HUNT',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' FACE',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' BRICK',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' DIGNITARY',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' EVERLASTING',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' DIRECTION',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '51',
//           type: 'skill category',
//           name: ' BANDSAW',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' CONTINUOUS',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' GEMS',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' RASTLED',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' DISTILERY',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' PERIODIC',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '52',
//           type: 'skill category',
//           name: ' CREATURE',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' GLOW',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' INSECT',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' CRASH',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' NORM',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' HOLIDAY',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '53',
//           type: 'skill category',
//           name: ' DENSE',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' VIPER',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' EMPATHIC',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' OFFICER',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' MOHAWK',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: 'HEAD',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '54',
//           type: 'skill category',
//           name: ' BONE',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: 'CURIOSITIES',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' HOTLY',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' DISCIPLINE',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' HONEYDEW',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' DIAGONAL',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '55',
//           type: 'skill category',
//           name: ' RUBY',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' BOARDINGHOUSE',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' ORTHODOX',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' GREATEST',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' AFFLICTION',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' HEAVY',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '6',
//           type: 'skill category',
//           name: 'CURIOSITIES',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' HAND',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' RUBBER',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' DEMON',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' INSECURE',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' IMPOSTER',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '7',
//           type: 'skill category',
//           name: ' HOTLY',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' TASTE',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' DREAM',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' PARACHUTE',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' ANGEL',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' BEHOLD',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '8',
//           type: 'skill category',
//           name: ' DISCIPLINE',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' BOUNCY',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' PROPHET',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' GRASP',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' FAVORABLE',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' DISFIGURED',
//               children: [],
//             },
//           ],
//         },
//         {
//           id: '9',
//           type: 'skill category',
//           name: ' HONEYDEW',
//           children: [
//             {
//               id: '1',
//               type: 'skill',
//               name: ' HEATER',
//               children: [],
//             },
//             {
//               id: '2',
//               type: 'skill',
//               name: ' LOLLIPOP',
//               children: [],
//             },
//             {
//               id: '3',
//               type: 'skill',
//               name: ' CONVERTIBLE',
//               children: [],
//             },
//             {
//               id: '4',
//               type: 'skill',
//               name: ' GONE',
//               children: [],
//             },
//             {
//               id: '5',
//               type: 'skill',
//               name: ' COSTUMED',
//               children: [],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       name: 'Physical Locations',
//       filters: [
//         {
//           id: '1',
//           type: 'physical location',
//           name: 'Vancouver D',
//           children: [],
//         },
//         {
//           id: 'ADFSKGLCCL',
//           type: 'physical location',
//           name: 'EFTBQMT',
//           children: [],
//         },
//         {
//           id: 'ANMAGXHXQY',
//           type: 'physical location',
//           name: 'KJVRBLN',
//           children: [],
//         },
//         {
//           id: 'BSAATHVUVS',
//           type: 'physical location',
//           name: 'JPVJIAE',
//           children: [],
//         },
//         {
//           id: 'BXJYIASWWF',
//           type: 'physical location',
//           name: 'RIWSWYK',
//           children: [],
//         },
//         {
//           id: 'CFJDUPKHUL',
//           type: 'physical location',
//           name: 'VRMVOLF',
//           children: [],
//         },
//         {
//           id: 'CGGUBVBQLX',
//           type: 'physical location',
//           name: 'ULHXHCS',
//           children: [],
//         },
//         {
//           id: 'CTSDNTHGRW',
//           type: 'physical location',
//           name: 'OAHWLYQ',
//           children: [],
//         },
//         {
//           id: 'CXOWXWXUKK',
//           type: 'physical location',
//           name: 'GEWRCUS',
//           children: [],
//         },
//         {
//           id: 'DKNWCRMSOH',
//           type: 'physical location',
//           name: 'EUCFUPC',
//           children: [],
//         },
//         {
//           id: 'EGIDISNKXO',
//           type: 'physical location',
//           name: 'ATKISHM',
//           children: [],
//         },
//         {
//           id: 'EVEPTEOBCG',
//           type: 'physical location',
//           name: 'KSXGUXV',
//           children: [],
//         },
//         {
//           id: 'FALFUVFGUC',
//           type: 'physical location',
//           name: 'QDIECFT',
//           children: [],
//         },
//         {
//           id: 'FFMSBSDSAI',
//           type: 'physical location',
//           name: 'TQDJVHU',
//           children: [],
//         },
//         {
//           id: 'FSBGIBLBBT',
//           type: 'physical location',
//           name: 'IIOJBYG',
//           children: [],
//         },
//         {
//           id: 'G',
//           type: 'physical location',
//           name: 'Vancouver B',
//           children: [],
//         },
//         {
//           id: 'GHHDT',
//           type: 'physical location',
//           name: 'Vancouver A',
//           children: [],
//         },
//         {
//           id: 'GHHDT1H7',
//           type: 'physical location',
//           name: 'Vancouver',
//           children: [],
//         },
//         {
//           id: 'GHPVBHTOUJ',
//           type: 'physical location',
//           name: 'DUDSLEO',
//           children: [],
//         },
//         {
//           id: 'GLDVKICXMT',
//           type: 'physical location',
//           name: 'BEGOVEH',
//           children: [],
//         },
//         {
//           id: 'GOMHFPOGUU',
//           type: 'physical location',
//           name: 'TCKJLQO',
//           children: [],
//         },
//         {
//           id: 'GQCGTFFAEI',
//           type: 'physical location',
//           name: 'GANOREE',
//           children: [],
//         },
//         {
//           id: 'H',
//           type: 'physical location',
//           name: 'Vancouver C',
//           children: [],
//         },
//         {
//           id: 'HXRWBSKWJH',
//           type: 'physical location',
//           name: 'SJSSLUW',
//           children: [],
//         },
//         {
//           id: 'IEXLSBPFFL',
//           type: 'physical location',
//           name: 'GUIMCXB',
//           children: [],
//         },
//         {
//           id: 'IOHWIRCXYL',
//           type: 'physical location',
//           name: 'IFKIVMA',
//           children: [],
//         },
//         {
//           id: 'IOTBMKHONE',
//           type: 'physical location',
//           name: 'YEXWMGV',
//           children: [],
//         },
//         {
//           id: 'IRTKQJQPRR',
//           type: 'physical location',
//           name: 'BJULUMH',
//           children: [],
//         },
//         {
//           id: 'JGH7T',
//           type: 'physical location',
//           name: 'Prince George',
//           children: [],
//         },
//         {
//           id: 'JMEFDYWUOJ',
//           type: 'physical location',
//           name: 'GHGWRWG',
//           children: [],
//         },
//         {
//           id: 'KFHIJPRXWD',
//           type: 'physical location',
//           name: 'LNDMNKX',
//           children: [],
//         },
//         {
//           id: 'KUHRQULABM',
//           type: 'physical location',
//           name: 'YPHIAMS',
//           children: [],
//         },
//         {
//           id: 'KWQBTDCQKD',
//           type: 'physical location',
//           name: 'LGYIHFO',
//           children: [],
//         },
//         {
//           id: 'LDFS8F3DDS',
//           type: 'physical location',
//           name: 'Kelowna',
//           children: [],
//         },
//         {
//           id: 'LUGYJWXGID',
//           type: 'physical location',
//           name: 'YJVJHJU',
//           children: [],
//         },
//         {
//           id: 'MDYRRNPOPM',
//           type: 'physical location',
//           name: 'NDIMERN',
//           children: [],
//         },
//         {
//           id: 'MHQUOXICDL',
//           type: 'physical location',
//           name: 'NOUMOIT',
//           children: [],
//         },
//         {
//           id: 'MKTBCMOGJD',
//           type: 'physical location',
//           name: 'TLLHVOO',
//           children: [],
//         },
//         {
//           id: 'MUYIGLPFKK',
//           type: 'physical location',
//           name: 'AAWPAAT',
//           children: [],
//         },
//         {
//           id: 'MXRPMHNHLM',
//           type: 'physical location',
//           name: 'UNQUSRH',
//           children: [],
//         },
//         {
//           id: 'OIWSMMAFNH',
//           type: 'physical location',
//           name: 'EQFOMNR',
//           children: [],
//         },
//         {
//           id: 'OXNALHAOSG',
//           type: 'physical location',
//           name: 'LPOEIJP',
//           children: [],
//         },
//         {
//           id: 'PBEADQDUXA',
//           type: 'physical location',
//           name: 'HCDGSCN',
//           children: [],
//         },
//         {
//           id: 'PPNOTORXDM',
//           type: 'physical location',
//           name: 'PRQMIUW',
//           children: [],
//         },
//         {
//           id: 'PSSQQJXCWP',
//           type: 'physical location',
//           name: 'HIYBHVG',
//           children: [],
//         },
//         {
//           id: 'QAHDOVDRXB',
//           type: 'physical location',
//           name: 'RRDNNFT',
//           children: [],
//         },
//         {
//           id: 'QJSOGROFAQ',
//           type: 'physical location',
//           name: 'UBRMDVG',
//           children: [],
//         },
//         {
//           id: 'QNGQRYPYEV',
//           type: 'physical location',
//           name: 'XFENLMC',
//           children: [],
//         },
//         {
//           id: 'QRHGXLTTYC',
//           type: 'physical location',
//           name: 'GVUULLV',
//           children: [],
//         },
//         {
//           id: 'QYFMPNCELF',
//           type: 'physical location',
//           name: 'LBXRLNL',
//           children: [],
//         },
//         {
//           id: 'RYMJQTPXMG',
//           type: 'physical location',
//           name: 'GBVEXSI',
//           children: [],
//         },
//         {
//           id: 'SFNPUKTJOC',
//           type: 'physical location',
//           name: 'TLOTOXH',
//           children: [],
//         },
//         {
//           id: 'SGBRXCHTWX',
//           type: 'physical location',
//           name: 'TFERGEK',
//           children: [],
//         },
//         {
//           id: 'SGDUMYGSXU',
//           type: 'physical location',
//           name: 'GDKGTAY',
//           children: [],
//         },
//         {
//           id: 'SGEBLSMLUO',
//           type: 'physical location',
//           name: 'BANQRFV',
//           children: [],
//         },
//         {
//           id: 'SGLGOVBHVB',
//           type: 'physical location',
//           name: 'OPTNWLO',
//           children: [],
//         },
//         {
//           id: 'SHCPTGSYAX',
//           type: 'physical location',
//           name: 'WSDGEMW',
//           children: [],
//         },
//         {
//           id: 'SILUHSCQWC',
//           type: 'physical location',
//           name: 'UCGOQAT',
//           children: [],
//         },
//         {
//           id: 'TH8LF9',
//           type: 'physical location',
//           name: 'Victoria',
//           children: [],
//         },
//         {
//           id: 'UMYPVJPAET',
//           type: 'physical location',
//           name: 'PVEBXVQ',
//           children: [],
//         },
//         {
//           id: 'VBGWRCGAAY',
//           type: 'physical location',
//           name: 'QMRUXQW',
//           children: [],
//         },
//         {
//           id: 'XEYKGGMUDU',
//           type: 'physical location',
//           name: 'VQGRXIJ',
//           children: [],
//         },
//         {
//           id: 'XGUNGQCCRI',
//           type: 'physical location',
//           name: 'PIWMKBL',
//           children: [],
//         },
//         {
//           id: 'XQVYWNVVBH',
//           type: 'physical location',
//           name: 'VTDXFVF',
//           children: [],
//         },
//         {
//           id: 'XYMYVEUAOY',
//           type: 'physical location',
//           name: 'JPMYTWG',
//           children: [],
//         },
//         {
//           id: 'YLWWXBXKYM',
//           type: 'physical location',
//           name: 'FAURUES',
//           children: [],
//         },
//         {
//           id: 'YPBGIDFUUA',
//           type: 'physical location',
//           name: 'WPMATJP',
//           children: [],
//         },
//         {
//           id: 'YPFNEYLEXD',
//           type: 'physical location',
//           name: 'YOYPMRU',
//           children: [],
//         },
//       ],
//     },
//   ],
// };
