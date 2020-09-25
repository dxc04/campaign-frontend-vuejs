<template>
<div class="h-screen w-screen container mx-auto px-4 lg:pt-24 lg:pb-64">
    <slot v-if="!campaignsList.length">
        <div class="flex flex-wrap text-center justify-center">
            <div class="w-full px-4">
                <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-500">Hey there, looks like you haven't listed a campaign yet...</p>
                <h2 class="font-sans font-thin mb-4 text-gray-600 text-xl">Start a campaign now!</h2>
                <button @click="openModal=true" class="bg-pink-500 hover:bg-pink-400 text-white font-semibold py-2 px-4 border-b-4 border-pink-700 hover:border-pink-500 rounded">Launch</button>
            </div>
        </div>
        <div class="flex flex-wrap mt-12 justify-center">
            <img alt="Start adding a campaign" src="../assets/undraw_maker_launch_crhe.svg" style="width: 65%; height: 65%;" />
        </div>
    </slot>
    <slot v-if="campaignsList.length">
        <div class="container w-screen pt-24">

          <div class="md:flex md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
              <h2 class="text-2xl font-bold leading-7 text-gray-700 sm:text-3xl sm:leading-9 sm:truncate">
                Campaigns
              </h2>
            </div>
            <div class="mt-4 flex md:mt-0 md:ml-4">
              <span class="ml-3 shadow-sm rounded-md">
                <button @click="openModal=true" class="bg-pink-500 hover:bg-pink-400 text-white font-semibold py-2 px-4 border-b-4 border-pink-700 hover:border-pink-500 rounded">
                  New Campaign
                </button>
              </span>
            </div>
          </div>
            <ul class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <li v-for="(item, index) in campaignsList" :key="index" class="col-span-1 flex shadow-sm rounded-md">
                    <div class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-md truncate">
                        <div class="flex-1 px-4 py-2 text-sm leading-5 truncate">
                            <a href="#" class="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150">{{item.name}}</a>
                            <div><span class="inline-block rounded text-white bg-blue-300 px-2 text-xs font-thin mr-3">{{item.channel}}</span></div>
                            <p class="text-gray-500">{{item.status}} | {{ item.startDate }}</p>
                        </div>
                        <div class="flex-shrink-0 pr-2">
                          <div class="flex items-center select-none">
                            <button @click="showEditForm(item)" class="ml-2 bg-gray-700 text-gray-200 rounded-full p-2 focus:outline-none
                              hover:text-gray-300 hover:bg-gray-600 transition
                              duration-500 ease-in-out">
                                  <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" stroke-width="2" fill="none" 
                                  stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M12 20h9"></path>
                                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                            </button>
                            <button @click="deleteCampaign(item.id)" class="ml-2 bg-red-700 text-red-200 rounded-full p-2 focus:outline-none
                              hover:text-gray-300 hover:bg-gray-600 transition
                              duration-500 ease-in-out">
                                <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" stroke-width="2" fill="none" 
                                stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                          </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

    </slot>

    <slot v-if="openModal">
        <div class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

                <div class="h-full inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                        <button @click="openModal=false" type="button" class="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150" aria-label="Close">
                            <!-- Heroicon name: x -->
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div class="py-6">
                        <form v-on:submit.prevent="onSubmit" class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                            <div class="sm:col-span-2">
                                <label for="campaign_name" class="block text-sm font-medium leading-5 text-gray-700">What is the campaign about?</label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <input v-model="campaign.name" id="campaign_name" class="form-input py-2 px-4 block w-full transition ease-in-out duration-150">
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="start_date" class="block text-sm font-medium leading-5 text-gray-700">When does it commence?</label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <VueTailwindPicker @change="(v) => campaign.startDate = v">
                                        <input class="form-input py-2 px-4 block w-full transition ease-in-out duration-150" type="text" v-model="campaign.startDate" />
                                    </VueTailwindPicker>
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="message" class="block text-sm font-medium leading-5 text-gray-700">Which channel will it be launched?</label>
                                <div class="mt-1 relative rounded-md">
                                    <div class="mt-4">
                                        <div class="flex items-center">
                                            <input v-model="campaign.channel" value="Email Marketing" id="email_marketing" type="radio" class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">
                                            <label for="email_marketing" class="ml-3">
                                                <span class="block text-sm leading-5 text-gray-700">Email Marketing</span>
                                            </label>
                                        </div>
                                        <div class="mt-4 flex items-center">
                                            <input v-model="campaign.channel" value="Social Media" id="social_media" type="radio" class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">
                                            <label for="social_media" class="ml-3">
                                                <span class="block text-sm leading-5 text-gray-700">Social Media</span>
                                            </label>
                                        </div>
                                        <div class="mt-4 flex items-center">
                                            <input v-model="campaign.channel" value="Paid Search" id="paid_search" type="radio" class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">
                                            <label for="paid_search" class="ml-3">
                                                <span class="block text-sm leading-5  text-gray-700">Paid Search</span>
                                            </label>
                                        </div>
                                        <div class="mt-4 flex items-center">
                                            <input v-model="campaign.channel" value="Offline Promo" id="offline_promo" type="radio" class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">
                                            <label for="offline_promo" class="ml-3">
                                                <span class="block text-sm leading-5 text-gray-700">Offline Promo</span>
                                            </label>
                                        </div>
                                        <div class="mt-4 flex items-center">
                                            <input v-model="campaign.channel" value="Digital Marketing" id="digital_marketing" type="radio" class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">
                                            <label for="digital_marketing" class="ml-3">
                                                <span class="block text-sm leading-5 text-gray-700">Digital Marketing</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="message" class="block text-sm font-medium leading-5 text-gray-700">What's the status of the campaign?</label>
                                <div class="mt-1 relative rounded-md">
                                    <div class="mt-4">
                                        <div class="flex items-center">
                                            <input v-model="campaign.status" value="Occuring" id="occuring" type="radio" class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">
                                            <label for="occuring" class="ml-3">
                                                <span class="block text-sm leading-5 text-gray-700">Occurring</span>
                                            </label>
                                        </div>
                                        <div class="mt-4 flex items-center">
                                            <input v-model="campaign.status" value="Upcoming" id="upcoming" type="radio" class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">
                                            <label for="upcoming" class="ml-3">
                                                <span class="block text-sm leading-5 text-gray-700">Upcoming</span>
                                            </label>
                                        </div>
                                        <div class="mt-4 flex items-center">
                                            <input v-model="campaign.status" value="Cancelled" id="cancelled" type="radio" class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">
                                            <label for="cancelled" class="ml-3">
                                                <span class="block text-sm leading-5  text-gray-700">Cancelled</span>
                                            </label>
                                        </div>
                                        <div class="mt-4 flex items-center">
                                            <input v-model="campaign.status" value="Ended" id="ended" type="radio" class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">
                                            <label for="ended" class="ml-3">
                                                <span class="block text-sm leading-5 text-gray-700">Ended</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <span class="w-full inline-flex rounded-md shadow-sm">
                                    <button type="submit" class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                                        Save
                                    </button>
                                </span>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </slot>
</div>
</template>

<script>
import VueTailwindPicker from 'vue-tailwind-picker';

import {
    mapGetters,
    mapActions
} from "vuex";
export default {
    name: "Campaign",
    components: {
        VueTailwindPicker
    },
    data() {
        return {
            openModal: false,
            campaign: {
                id: null,
                name: null,
                status: null,
                startDate: null,
                channel: null
            }
        }
    },
    computed: {
        ...mapGetters(['campaignsList']),
    },
    methods: {
        ...mapActions(['fetchCampaigns', 'addCampaign', 'updateCampaign', 'deleteCampaign']),
        resetCampaign() {
          this.campaign = {
              id: null,
              name: null,
              status: null,
              startDate: null,
              channel: null
          }
        },
        showEditForm(campaign) {
          this.campaign = campaign;
          this.openModal = true;
        },
        onSubmit() {
            if (this.campaign.id) {
              this.updateCampaign(this.campaign);
            }
            else {
              this.addCampaign(this.campaign);
            }
            
            this.resetCampaign();
            this.openModal = false;
        },
    },
    created() {
        this.$store.dispatch('fetchCampaigns')
    }
};
</script>

<style scoped></style>
