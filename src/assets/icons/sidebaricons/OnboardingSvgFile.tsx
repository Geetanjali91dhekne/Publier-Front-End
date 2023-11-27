import React from 'react'
type Props = {
     color: string;
}
const OnboardingSvgFile: React.FC<Props> = ({ color }) => {
     return (
          <div className='mr-[10px]  w-fit h-[36px] flex items-center justify-center'>
               <svg width="24" height="17" viewBox="0 0 26 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 5.08281C24.9994 4.71845 24.8923 4.34894 24.6553 4.04434L22.7537 1.61116C22.4352 1.20672 21.9505 1.0008 21.4662 1C21.178 1 20.8845 1.07388 20.6252 1.23559L18.771 2.38919C18.576 2.51355 18.2417 2.59891 17.9188 2.5967C17.6679 2.59778 17.4255 2.54758 17.2654 2.4685L15.4496 1.58898C15.1568 1.44798 14.8303 1.39019 14.502 1.38963C14.0305 1.39183 13.5529 1.5077 13.1692 1.77363L12.9573 1.92227C12.788 1.83775 12.5292 1.70898 12.236 1.56311C11.8845 1.39075 11.4711 1.32123 11.0535 1.31988C10.6763 1.32095 10.2992 1.37908 9.96808 1.51895L8.73133 2.04667C8.53005 2.13395 8.20989 2.19095 7.89189 2.18955C7.57389 2.19091 7.2543 2.13391 7.05302 2.04667L5.81514 1.51867C5.58934 1.42239 5.34799 1.38123 5.10878 1.38095C4.83334 1.38123 4.55955 1.43552 4.30506 1.53859C4.05091 1.64223 3.81499 1.79523 3.62711 2.00519L1.37336 4.52922C1.12356 4.80817 0.999486 5.15945 1 5.50525C0.999486 5.91761 1.17592 6.33128 1.51624 6.6212L3.61858 8.41483L2.62127 9.45522C2.34635 9.74214 2.20947 10.1141 2.20947 10.482C2.20895 10.8733 2.36439 11.2685 2.67227 11.5594L2.87458 11.7517C3.06522 11.9325 3.2943 12.0475 3.53402 12.1089C3.41378 12.3301 3.34806 12.5725 3.34858 12.8155C3.34806 13.2071 3.5035 13.602 3.81081 13.8933L3.8103 13.893L4.01322 14.0861C4.30206 14.3599 4.6765 14.4962 5.04541 14.496C5.24369 14.4963 5.4422 14.4565 5.62877 14.3785C5.69425 14.6441 5.82949 14.8966 6.0422 15.0984L6.24513 15.2915C6.53397 15.5653 6.9078 15.7016 7.27731 15.7014C7.56616 15.7017 7.85631 15.6166 8.10611 15.4513C8.17919 15.6864 8.30439 15.9092 8.49499 16.0903L8.69791 16.2834C8.98614 16.5572 9.36058 16.6935 9.72958 16.6933C10.1225 16.6936 10.5194 16.5392 10.8125 16.2332L11.6939 15.3128L12.8914 16.4211C13.1781 16.687 13.546 16.8192 13.9092 16.8184C14.3082 16.8193 14.7107 16.6594 15.0044 16.345L15.1956 16.1402C15.3606 15.963 15.4683 15.7532 15.5308 15.5342L15.9947 15.9624C16.2818 16.2272 16.6492 16.3589 17.0119 16.3586C17.4114 16.3589 17.815 16.1991 18.109 15.8844L18.2991 15.6798C18.5186 15.4453 18.6422 15.1548 18.6804 14.8582C18.8028 14.8895 18.9269 14.9108 19.052 14.9108C19.4515 14.9108 19.8541 14.7512 20.1483 14.4369L20.339 14.2323C20.6054 13.9467 20.738 13.5805 20.7374 13.2194C20.7374 13.1073 20.7213 12.9958 20.6965 12.8856C21.0279 12.8417 21.3491 12.6939 21.5935 12.4315L21.7846 12.2267C22.051 11.9412 22.183 11.575 22.183 11.2136C22.1836 10.816 22.0232 10.4148 21.7069 10.1225L21.3494 9.79225L24.5762 6.22459C24.8658 5.90341 24.9995 5.48997 25 5.08281ZM3.90691 11.3498C3.73595 11.3492 3.56875 11.2881 3.43811 11.1643L3.23547 10.9721C3.09527 10.8395 3.02603 10.6631 3.02547 10.482C3.02603 10.3121 3.08683 10.1463 3.21203 10.0157L5.25466 7.88411C5.38774 7.74526 5.5653 7.67575 5.74745 7.67552C5.91789 7.6758 6.08453 7.73716 6.21625 7.86123L6.41805 8.05375C6.41805 8.05375 6.62697 8.3627 6.62749 8.54406C6.62697 8.67986 6.58605 8.81214 6.50669 8.9267C6.49989 8.9335 4.30206 11.224 4.30206 11.224C4.18534 11.3066 4.04735 11.3492 3.90691 11.3498ZM5.53825 13.4759C5.40545 13.6142 5.22817 13.6834 5.04602 13.684C4.87506 13.6837 4.70838 13.6223 4.57722 13.4985L4.3743 13.3057L4.37378 13.3054C4.2347 13.1734 4.16486 12.9964 4.16486 12.8153C4.16486 12.6454 4.22622 12.4796 4.35081 12.349C4.35081 12.349 7.07359 9.51466 7.09652 9.48733C7.22664 9.36217 7.39431 9.29753 7.56747 9.29725C7.73842 9.29753 7.90511 9.35861 8.03627 9.48269L8.23919 9.67577C8.37878 9.80777 8.44811 9.98448 8.44863 10.1658C8.44806 10.3357 8.38675 10.5018 8.26206 10.6324L5.53825 13.4759ZM7.76983 14.6809C7.63731 14.8195 7.46008 14.8889 7.27788 14.8894C7.10692 14.8891 6.94024 14.8277 6.80908 14.7037L6.60559 14.5108C6.466 14.3785 6.39616 14.2019 6.39616 14.0207C6.39616 13.8692 6.44772 13.7221 6.54639 13.5997L8.44258 11.6206C8.5705 11.5052 8.73081 11.4444 8.89694 11.4444C9.06789 11.4447 9.23458 11.5058 9.36574 11.6298L9.56922 11.8229C9.7083 11.9549 9.77814 12.1316 9.77866 12.3127C9.77809 12.4829 9.71622 12.649 9.59209 12.7793L7.76983 14.6809ZM11.3727 14.4721L10.2221 15.6729C10.0896 15.8114 9.91206 15.8807 9.72991 15.8813C9.55895 15.881 9.39227 15.8196 9.26111 15.6955L9.05819 15.5027C8.91911 15.3707 8.84927 15.1937 8.84875 15.0126C8.84927 14.8424 8.91063 14.6763 9.03531 14.5463L10.1854 13.3455C10.3185 13.207 10.496 13.1374 10.6782 13.1371C10.8486 13.1374 11.0158 13.1985 11.147 13.3228L11.3505 13.5157C11.4895 13.6477 11.5588 13.8244 11.5594 14.0055C11.5587 14.1756 11.4974 14.3417 11.3727 14.4721ZM21.3683 11.2147C21.368 11.3815 21.3083 11.5448 21.1872 11.6746L20.9965 11.8792C20.8635 12.0215 20.6829 12.0935 20.498 12.0938C20.3303 12.0935 20.1661 12.0346 20.0358 11.9141L16.8232 8.94316L16.2677 9.53795L19.7064 12.7235C19.8496 12.8561 19.9215 13.0361 19.9226 13.2199C19.9215 13.3873 19.8623 13.5504 19.7415 13.6802L19.5514 13.8848C19.4184 14.0272 19.2378 14.0989 19.0529 14.0995C18.8852 14.0989 18.7205 14.0397 18.5912 13.92L15.3778 10.9491L14.8228 11.5439L17.6746 14.1811C17.812 14.3128 17.8825 14.4881 17.8825 14.6681C17.8825 14.835 17.8232 14.9983 17.7025 15.1279L17.5118 15.3325C17.3793 15.4748 17.1982 15.5468 17.0128 15.5473C16.8445 15.5468 16.6803 15.4876 16.5505 15.3679L13.7045 12.7403H13.704L13.7035 12.7397L13.1496 13.3356L13.1501 13.3361L13.1608 13.3462L14.5863 14.6618C14.7125 14.7916 14.778 14.958 14.7785 15.13C14.778 15.2961 14.7193 15.4586 14.5985 15.5882L14.4078 15.793C14.2748 15.9354 14.0948 16.0068 13.9104 16.0074C13.7427 16.0069 13.5785 15.948 13.4487 15.8277L12.2076 14.6785C12.3156 14.4666 12.3759 14.2367 12.3759 14.006C12.3764 13.6146 12.2209 13.22 11.9136 12.9285L11.7101 12.7354C11.4219 12.4619 11.048 12.3253 10.679 12.3258C10.6504 12.3258 10.6215 12.3324 10.5934 12.334C10.5934 12.3272 10.595 12.3201 10.595 12.3133C10.5955 11.9219 10.1328 11.2352 10.1328 11.2352L9.92988 11.0427C9.71416 10.8382 9.45095 10.7106 9.1772 10.6593C9.23364 10.4995 9.26556 10.3331 9.26556 10.1665C9.26556 9.77514 9.11064 9.38022 8.80333 9.08903L8.60041 8.89595C8.31156 8.62215 7.93774 8.48551 7.56874 8.4858C7.52566 8.4858 7.48314 8.49451 7.4403 8.49836C7.42858 8.12256 7.27722 7.74705 6.9827 7.46725V7.46697L6.78034 7.27473C6.4915 7.00066 6.11767 6.86401 5.74867 6.8643C5.35511 6.86401 4.95888 7.01837 4.66577 7.32437L4.18361 7.82753L2.0477 6.00578C1.89419 5.87434 1.81755 5.6927 1.81699 5.50619C1.8175 5.34991 1.8707 5.19691 1.98414 5.06987L4.23784 2.54589C4.32728 2.44553 4.45956 2.35473 4.61449 2.29169C4.76941 2.22869 4.94528 2.19409 5.10972 2.19433C5.25292 2.19433 5.38731 2.22025 5.4948 2.26661L6.73211 2.79456C7.08091 2.94156 7.48586 3.00184 7.89283 3.00316C8.30027 3.0018 8.7047 2.94152 9.05355 2.79456L10.2903 2.26684C10.4809 2.18369 10.7686 2.13212 11.0547 2.1332C11.371 2.13128 11.6879 2.19677 11.8717 2.29056C11.9884 2.34864 12.0992 2.40377 12.202 2.45528L10.9406 3.34192C10.5354 3.62692 10.3169 4.08016 10.3175 4.53752C10.317 4.84023 10.4129 5.14839 10.6082 5.40991L10.6077 5.40934L10.7743 5.63322C11.0906 6.05378 11.584 6.27001 12.077 6.27109C12.3555 6.27109 12.6391 6.20073 12.8919 6.04909L13.6462 5.59609C13.8001 5.50202 14.0324 5.44258 14.2726 5.44366C14.5549 5.44201 14.8393 5.5255 15.0103 5.65117L17.0972 7.14728C17.5616 7.48 18.3181 8.09716 18.7373 8.48552L21.1527 10.7188C21.2957 10.8514 21.3677 11.0306 21.3683 11.2147ZM23.9705 5.68169L20.7528 9.23978L19.2918 7.88931C18.8342 7.46688 18.0796 6.85084 17.5735 6.48728L15.4872 4.99117C15.1335 4.74058 14.7004 4.63225 14.2722 4.63066C13.9079 4.63173 13.5408 4.71114 13.2239 4.89981L12.4702 5.35281C12.3545 5.42233 12.2182 5.45781 12.0766 5.45809C11.8235 5.45894 11.5702 5.34081 11.4289 5.14853L11.2629 4.92494L11.2623 4.92437C11.1739 4.80522 11.1328 4.67158 11.1322 4.5363C11.1333 4.33173 11.2276 4.13322 11.4104 4.00422L13.6406 2.43719C13.8335 2.29759 14.1766 2.19967 14.5024 2.20211C14.7288 2.20103 14.945 2.24655 15.0931 2.31967L16.9088 3.19919C17.2184 3.34783 17.5677 3.40862 17.9192 3.40947C18.3708 3.40727 18.8273 3.30911 19.2034 3.07811L21.0582 1.92428C21.1765 1.85041 21.3186 1.8122 21.4667 1.8122C21.7171 1.81169 21.968 1.92513 22.1101 2.11028L24.0117 4.54347C24.1213 4.68283 24.1848 4.87942 24.1848 5.08319C24.1852 5.31105 24.1047 5.53525 23.9705 5.68169Z" fill={color} stroke={color} stroke-width="0.3" />
               </svg>

          </div>
     )
}

export default OnboardingSvgFile