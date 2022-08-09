<template>
        <div class="w-100">
        <div class="row w-100 h-100">
            <div class="col-lg-3 col-md-4 bg-light d-flex align-items-center flex-column overflow-hidden position-relative">
                <img src="@/assets/exp/topmenu.jpg" class="h-100" />
            </div>

            <div class="col-lg-6 col-md-4 h-100 position-relative">
                <div class="position-absolute w-100 d-flex justify-content-center" style="top: 20%">
                    <p class="extra-bold bg-light p-3 rounded nice-shadow text-center" style="font-size: 24px;">
                        {{ $t('expTopmenuTitle') }}
                    </p>
                </div>

                <div class="position-absolute w-100 d-flex justify-content-center" style="bottom: 25%">
                    <p class="extra-bold bg-light p-3 rounded nice-shadow text-center" style="font-size: 24px;">
                        Top Menu <br /> {{ $t('expTopmenuDate') }}
                    </p>
                </div>
            </div>

            <div class="col-lg-3 col-md-4 bg-light align-item-center p-0 overflow-hidden position-relative">
                <img src="@/assets/exp/villeray.jpg" class="w-100 h-25"/>
                <p class="p-3">
                    
                    <span v-html="$t('expTopmenuText')"></span>
                    &nbsp;
                    <font-awesome-icon class="cursor-pointer" @click="goToTopmenuApp" icon="fa-solid fa-mobile" />
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class CegepExpPage extends Vue {
    goToTopmenuApp() {
        window.open('https://apps.apple.com/ca/app/top-menu/id1471280740', '_blank');
    }
}
</script>