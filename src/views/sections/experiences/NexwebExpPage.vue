<template>
    <div class="w-100">
        <div class="row w-100 h-100">
            <div class="col-lg-3 col-md-4 bg-light d-flex align-items-center flex-column overflow-hidden position-relative">
                <img src="@/assets/exp/entreprises.jpg" />
                <img src="@/assets/exp/nordelec.jpg" />
            </div>

            <div class="col-lg-6 col-md-4 h-100 position-relative">
                <div class="position-absolute w-100 d-flex justify-content-center" style="top: 20%">
                    <p class="extra-bold bg-light p-3 rounded nice-shadow text-center" style="font-size: 24px;">
                        {{ $t('expNexwebTitle') }}
                    </p>
                </div>

                <div class="position-absolute w-100 d-flex justify-content-center" style="bottom: 25%">
                    <p class="extra-bold bg-light p-3 rounded nice-shadow text-center" style="font-size: 24px;">
                        Nexweb Solutions Internet <br /> {{ $t('expNexwebDate') }}
                    </p>
                </div>
            </div>

            <div class="col-lg-3 col-md-4 bg-light align-item-center p-0 overflow-hidden position-relative">
                <img src="@/assets/exp/canal.jpg" class="h-25" />
                <p class="p-3" v-html="$t('expNexwebText')"> 
                </p>
            </div>
        </div>
    </div>
</template>